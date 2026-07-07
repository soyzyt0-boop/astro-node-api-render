function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function corsEmpty(status = 204) {
  return new Response(null, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      "Cache-Control": "no-store",
    },
  });
}

function fallbackSections(localAnswer) {
  return {
    overall: localAnswer?.phase || "",
    block: localAnswer?.block || "",
    support: localAnswer?.support || "",
    breakPoint: localAnswer?.breakPoint || "",
    habit: localAnswer?.habit || "",
    reminder: (localAnswer?.reminder || "").replace(/^断语[:：]\s*/, "").trim() || "",
  };
}

function pickSection(text, label) {
  const pattern = new RegExp(`${label}[:：=]\\s*([\\s\\S]*?)(?=\\n(?:总断|症结|来路|破口|旧业|断语)[:：=]|$)`);
  return text.match(pattern)?.[1]?.trim() || "";
}

function tightenLine(text, max = 38) {
  return String(text || "")
    .replace(/^总断[:：]\s*|^症结[:：]\s*|^来路[:：]\s*|^破口[:：]\s*|^旧业[:：]\s*|^断语[:：]\s*/g, "")
    .replace(/\s+/g, " ")
    .replace(/。+/g, "。")
    .replace(/；+/g, "；")
    .replace(/，而且|，并且/g, "，")
    .trim()
    .slice(0, max)
    .trim();
}

function normalizeMasterText(rawText, localAnswer) {
  const normalized = String(rawText || "").replace(/\r/g, "").trim();
  const fallback = fallbackSections(localAnswer);
  const firstLine = normalized.split("\n")[0]?.trim() || fallback.overall;

  const sections = {
    overall: pickSection(normalized, "总断") || firstLine,
    block: pickSection(normalized, "症结") || fallback.block,
    support: pickSection(normalized, "来路") || fallback.support,
    breakPoint: pickSection(normalized, "破口") || fallback.breakPoint,
    habit: pickSection(normalized, "旧业") || fallback.habit,
    reminder: pickSection(normalized, "断语") || fallback.reminder,
  };

  return [
    `总断：${tightenLine(sections.overall || fallback.overall, 72)}`,
    `症结：${tightenLine(sections.block || fallback.block, 32)}`,
    `来路：${tightenLine(sections.support || fallback.support, 32)}`,
    `破口：${tightenLine(sections.breakPoint || fallback.breakPoint, 32)}`,
    `旧业：${tightenLine(sections.habit || fallback.habit, 32)}`,
    `断语：${tightenLine(sections.reminder || fallback.reminder, 22)}`,
  ].join("\n");
}

async function runCloudflareAI(env, prompt, localAnswer) {
  if (!env.AI || typeof env.AI.run !== "function") {
    return null;
  }

  const model = env.CF_AI_MODEL || "@cf/ibm-granite/granite-4.0-h-micro";
  const result = await env.AI.run(model, {
    messages: [
      {
        role: "system",
        content: "你是命理馆批命师傅。口吻要短、冷、稳、利，像断语，不像说明；不鸡汤，不安慰，不解释自己。",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 700,
  });

  const outputText =
    typeof result?.response === "string" ? result.response :
    typeof result?.result?.response === "string" ? result.result.response :
    typeof result?.output_text === "string" ? result.output_text :
    typeof result?.choices?.[0]?.message?.content === "string" ? result.choices[0].message.content :
    Array.isArray(result?.choices?.[0]?.message?.content)
      ? result.choices[0].message.content.map((item) => item?.text || "").join("").trim()
      : "";

  return {
    provider: "cloudflare-ai",
    model,
    output_text: normalizeMasterText(outputText, localAnswer),
  };
}

async function runCloudflareAIChat(env, prompt) {
  if (!env.AI || typeof env.AI.run !== "function") {
    return null;
  }

  const model = env.CF_AI_MODEL || "@cf/ibm-granite/granite-4.0-h-micro";
  const result = await env.AI.run(model, {
    messages: [
      {
        role: "system",
        content: "你是用户长期对话中的私人命理师。回答要像一对一继续说话，不像报告，不像模板，不像客服。先正面回答这次问题，再补判断。不要一上来就背年份总论、阶段总论，除非这次问题真的在问。口吻稳、准、直接，有判断，有区分，不鸡汤，不教程，不复读。严禁出现这种空话：‘每个人都有自己的节奏’、‘只要不影响生活和健康就可以’、‘这也是一种自我调适’。也严禁制造焦虑、道德评判、给用户打分，严禁使用‘不健康的支撑’‘你需要提升自我’‘这样不好’之类高位判断。用户要的是清楚分辨，不是被吓和被评判。",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 900,
  });

  const outputText =
    typeof result?.response === "string" ? result.response :
    typeof result?.result?.response === "string" ? result.result.response :
    typeof result?.output_text === "string" ? result.output_text :
    typeof result?.choices?.[0]?.message?.content === "string" ? result.choices[0].message.content :
    Array.isArray(result?.choices?.[0]?.message?.content)
      ? result.choices[0].message.content.map((item) => item?.text || "").join("").trim()
      : "";

  return {
    provider: "cloudflare-ai",
    model,
    output_text: String(outputText || "").trim(),
  };
}

async function runOpenAI(env, prompt, requestedModel, localAnswer) {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  const requested = requestedModel || "";
  const model = requested.startsWith("@cf/") ? (env.OPENAI_MODEL || "gpt-5.5-mini") : (requested || env.OPENAI_MODEL || "gpt-5.5-mini");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI request failed with ${response.status}`);
  }

  return {
    provider: "openai",
    model,
    output_text: normalizeMasterText(data.output_text || "", localAnswer),
    raw_id: data.id || "",
  };
}

async function runOpenAIChat(env, prompt, requestedModel) {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  const requested = requestedModel || "";
  const model = requested.startsWith("@cf/") ? (env.OPENAI_MODEL || "gpt-5.5-mini") : (requested || env.OPENAI_MODEL || "gpt-5.5-mini");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI request failed with ${response.status}`);
  }

  return {
    provider: "openai",
    model,
    output_text: String(data.output_text || "").trim(),
    raw_id: data.id || "",
  };
}

function buildServerPrompt(payload) {
  const { type, question, localAnswer, context } = payload;

  return [
    "你是命理馆批命师傅。",
    "口气要短、冷、稳、利，像断语，不像说明。",
    "宁可少说，不可发软；宁可下断，不可绕讲。",
    "禁止安慰、开导、鼓励、心理咨询、教程腔、自称AI、过程解释。",
    "只能根据给定底稿往下断，不可编造未提供的现实事实。",
    "每行尽量控制在8到28字，必要时可略长。",
    "请严格按以下6行输出，每行只写一段，不要多写前言结尾：",
    "总断：",
    "症结：",
    "来路：",
    "破口：",
    "旧业：",
    "断语：",
    "",
    "风格样例：",
    "总断：此段不是开运，是拆旧定轴。",
    "症结：旧命未退，主体未立。",
    "来路：根在亲缘，伤在位置。",
    "破口：先守主轴，再论外势。",
    "旧业：一急回头，一软失位。",
    "断语：先立命，再见路。",
    "",
    "命盘底稿：",
    `问题类型：${type}`,
    `用户问题：${question}`,
    `出生：${context.birth}`,
    `地点：${context.location}`,
    `主命：${context.tagline}`,
    `时间段：${context.startYear}.${String(context.startMonth).padStart(2, "0")} - ${context.endYear}.${String(context.endMonth).padStart(2, "0")}`,
    `焦点年：${context.focusYear}`,
    `分线判断：${context.aspectVerdict}`,
    context.yearly ? `流年：${context.yearly}` : "",
    context.specialized ? `分线流年：${context.specialized}` : "",
    `四段命势：${(context.stages || []).map((item) => `${item.tag}(${item.range})`).join("；")}`,
    `父母线：${(context.parentLines || []).join("；")}`,
    `本地批命底稿：总断=${localAnswer.phase}；症结=${localAnswer.block}；来路=${localAnswer.support}；破口=${localAnswer.breakPoint}；旧业=${localAnswer.habit}；断语=${localAnswer.reminder}`,
    "",
    "要求：",
    "1. 更像断命，不像说明书。",
    "2. 话可狠，不可散；可深，不可虚。",
    "3. 不重复用户原话，不说空话。",
    "4. 六行标签必须保留。"
  ].filter(Boolean).join("\n");
}

function buildChatPrompt(payload) {
  const { type, question, localAnswer, context } = payload;
  const recentTurns = Array.isArray(context.chatHistory) ? context.chatHistory.slice(-6) : [];
  return [
    "你现在是在继续和同一个用户深聊，不是在写命理报告。",
    "只回答这次这句话，不要自动展开成整套人生总论。",
    "不要套固定模板，不要每次都重复同一组句子。",
    "如果用户问得很短，要补成有信息量的回答，但仍然要贴着这次问题。",
    "可以直接下判断，也可以分2到4小段，但不要空泛，不要像说明书。",
    "不要自称AI，不要安慰，不要教程腔，不要装客观中立。",
    "不要说泛泛的正确话，不要说‘每个人都怎样’‘只要健康就行’这类废话。",
    "不要用极端二选一，不要把用户说成逃避、堕落、病态，除非底稿里明确支持。",
    "",
    `问题类型：${type}`,
    `用户问题：${question}`,
    `出生：${context.birth}`,
    `地点：${context.location}`,
    `主命：${context.tagline}`,
    `时间段：${context.startYear}.${String(context.startMonth).padStart(2, "0")} - ${context.endYear}.${String(context.endMonth).padStart(2, "0")}`,
    `焦点年：${context.focusYear}`,
    `分线判断：${context.aspectVerdict}`,
    context.yearly ? `总流年：${context.yearly}` : "",
    context.specialized ? `当前问题对应流年：${context.specialized}` : "",
    `四段命势：${(context.stages || []).map((item) => `${item.tag}(${item.range})`).join("；")}`,
    recentTurns.length ? `最近对话：${recentTurns.map((item) => `${item.role === "user" ? "你" : "师"}：${item.text}`).join(" ｜ ")}` : "",
    `参考底稿：总断=${localAnswer.phase}；症结=${localAnswer.block}；来路=${localAnswer.support}；破口=${localAnswer.breakPoint}`,
    "",
    "要求：",
    "1. 第一段先正面回答这次问题，不要先讲2026是重组年这种总论。",
    "2. 同一个用户不同问题，回答重点必须明显不同。",
    "3. 如果问题是问今年做什么，就回答做什么；问钱怎么来，就回答钱怎么来；问住处，就回答住处；问关系，就回答关系。",
    "4. 只有当年份、阶段、转折点对这次问题真的重要时，才提。",
    "5. 语言像真人继续说话，不像命书条目。",
    "6. 允许带判断，但不要每次都回到同一套话。",
    "7. 若用户问‘我现在这样行不行’，必须给出清楚区分：哪种情况行，哪种情况不行，关键判断点是什么。",
    "8. 区分要平，不要吓，不要上纲上线；多用‘关键看是不是越来越散/越来越稳’这种判断，不要用‘你这样就是逃避/不健康’这种判词。",
    "",
    "反面例子：‘每个人都有自己的兴趣和节奏，只要不影响生活和健康就可以。’",
    "反面例子：‘关键看这些活动是否真正帮助你提升自我，否则就只是逃避。’",
    "正面例子：‘能不能行，要看这是养命，还是耗命。若只是退旧力、少量做真事，可以；若越来越散、越来越空转，就不行。’",
    "正面例子：‘这不一定是在混日子。关键看你是越躺越散，还是越躺越回稳。前者不行，后者可以。’"
  ].filter(Boolean).join("\n");
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    if (body.ping) {
      if (env.AI && typeof env.AI.run === "function") {
        return json({ ok: true, message: "站内在线已通，当前走 Cloudflare AI 绑定" });
      }
      if (env.OPENAI_API_KEY) {
        return json({ ok: true, message: "站内在线已通，当前走 OpenAI" });
      }
      return json({ ok: false, message: "站内在线接口已通，但尚未绑定 Cloudflare AI 或 OPENAI_API_KEY" }, 200);
    }

    if (!body.question || !body.type || !body.localAnswer || !body.context) {
      return json({ error: "Invalid payload" }, 400);
    }

    if (body.mode === "chat") {
      const prompt = buildChatPrompt(body);
      const cfChatResult = await runCloudflareAIChat(env, prompt);
      if (cfChatResult?.output_text?.trim()) {
        return json({
          ok: true,
          provider: cfChatResult.provider,
          model: cfChatResult.model,
          output_text: cfChatResult.output_text,
          mode: "chat",
        });
      }

      const openaiChatResult = await runOpenAIChat(env, prompt, body.model);
      if (openaiChatResult?.output_text?.trim()) {
        return json({
          ok: true,
          provider: openaiChatResult.provider,
          model: openaiChatResult.model,
          output_text: openaiChatResult.output_text,
          raw_id: openaiChatResult.raw_id || "",
          mode: "chat",
        });
      }
    }

    const prompt = buildServerPrompt(body);
    const cfResult = await runCloudflareAI(env, prompt, body.localAnswer);
    if (cfResult?.output_text?.trim()) {
      return json({
        ok: true,
        provider: cfResult.provider,
        model: cfResult.model,
        output_text: cfResult.output_text,
      });
    }

    const openaiResult = await runOpenAI(env, prompt, body.model, body.localAnswer);
    if (openaiResult?.output_text?.trim()) {
      return json({
        ok: true,
        provider: openaiResult.provider,
        model: openaiResult.model,
        output_text: openaiResult.output_text,
        raw_id: openaiResult.raw_id || "",
      });
    }

    return json(
      {
        error: "No AI backend configured. Add a Cloudflare AI binding or OPENAI_API_KEY.",
      },
      500
    );
  } catch (error) {
    return json({ error: error.message || "Unknown server error" }, 500);
  }
}

export function onRequestOptions() {
  return corsEmpty();
}
