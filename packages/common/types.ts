import z from "zod";

export const TrainModol = z.object({
  name: z.string(),
  type: z.enum(["Man", "Woman", "Other"]),
  age: z.number(),
  ehinicity: z.enum(["White", "Black", "Asian American", "East Asian", "South East Asian", "South Asian", "Middle Eastern",  "Pacific", "Hispanic"]),
  eyeColor: z.enum(["Brown", "Blue",  "Hazel", "Gray"]),
  bald: z.boolean(),
  image: z.array(z.string()),
});


export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.number(),
  num: z.number(),
});

export const GenerateImageFromPack = z.object(({
    modelId: z.string(),
    packId: z.string(),
}))



