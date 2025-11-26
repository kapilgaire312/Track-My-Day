'use server'
const { pipeline } = require('@huggingface/transformers');

let classifier;

export async function classifyActivities(activity, categories) {
  if (!classifier) //to ensure the previously downloaded model is used for next calls.
    classifier = await pipeline('zero-shot-classification', 'Xenova/nli-deberta-v3-small');

  const result = await classifier(activity, categories);
  return result;
}

