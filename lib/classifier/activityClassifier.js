"use server";
const { env, pipeline } = require("@huggingface/transformers");

env.cacheDir = process.env.VERCEL
  ? "/tmp/track-my-day-transformers"
  : "./node_modules/@huggingface/transformers/.cache";

let classifierPromise;

export async function classifyActivities(activity, categories) {
  if (!classifierPromise) {
    console.time("activity classifier initialization");
    classifierPromise = pipeline(
      "zero-shot-classification",
      "Xenova/nli-deberta-v3-small",
      { dtype: "q8" },
    )
      .then((classifier) => {
        console.timeEnd("activity classifier initialization");
        return classifier;
      })
      .catch((error) => {
        classifierPromise = undefined;
        console.timeEnd("activity classifier initialization");
        console.error("Activity classifier initialization failed:", error);
        throw error;
      });
  }

  const classifier = await classifierPromise;
  console.time("activity classification");
  try {
    const result = await classifier(activity, categories);
    console.timeEnd("activity classification");
    return result;
  } catch (error) {
    console.timeEnd("activity classification");
    console.error("Activity classification failed:", error);
    throw error;
  }
}
