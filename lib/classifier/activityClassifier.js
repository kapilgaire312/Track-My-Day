"use server";
const { pipeline } = require("@huggingface/transformers");

let classifierPromise;

export async function classifyActivities(activity, categories) {
  if (!classifierPromise) {
    classifierPromise = pipeline(
      "zero-shot-classification",
      "Xenova/nli-deberta-v3-small",
    );
  }

  const classifier = await classifierPromise;
  return classifier(activity, categories);
}
