'use server'
const { pipeline } = require('@huggingface/transformers');

let classifier;

async function classifyActivities(text) {
  if (!classifier) //to ensure the previously downloaded model is used for next calls.
    classifier = await pipeline('zero-shot-classification', 'Xenova/nli-deberta-v3-small');
  const candidateLabels = ["exercise", "food", "sleep"];
  const result = await classifier(text, candidateLabels);
  return result;
}

classifyActivities("had a lunch with a friend.")
  .then(res => console.log(res))
  .catch(err => console.error(err));
