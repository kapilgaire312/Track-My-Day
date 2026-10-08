const MAX_CATEGORIES = 8;
const MAX_CATEGORY_LENGTH = 15;

export function normalizeCategoryList(categoryList) {
  if (!Array.isArray(categoryList) || categoryList.length === 0) {
    throw new Error("At least one category is required.");
  }

  const normalized = categoryList.map((category) => {
    if (typeof category !== "string") {
      throw new Error("Categories must be text.");
    }

    const value = category.trim();
    if (!value || value.length > MAX_CATEGORY_LENGTH) {
      throw new Error(
        `Categories must be between 1 and ${MAX_CATEGORY_LENGTH} characters.`,
      );
    }
    return value;
  });

  if (normalized.length > MAX_CATEGORIES) {
    throw new Error(`A maximum of ${MAX_CATEGORIES} categories is allowed.`);
  }

  const uniqueValues = new Set(normalized.map((category) => category.toLowerCase()));
  if (uniqueValues.size !== normalized.length) {
    throw new Error("Categories must be unique.");
  }

  return normalized;
}
