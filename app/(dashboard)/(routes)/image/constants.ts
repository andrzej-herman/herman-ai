import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Proszę wprowadzić opis obrazu" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 obraz",
  },
  {
    value: "2",
    label: "2 obrazy",
  },
  {
    value: "3",
    label: "3 obrazy",
  },
  {
    value: "4",
    label: "4 obrazy",
  },
  {
    value: "5",
    label: "5 obrazów",
  },
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "Małe (256px x 256px)",
  },
  {
    value: "512x512",
    label: "Średnie (512px x 512px)",
  },
  {
    value: "1024x1024",
    label: "Duże (1024px x 1024px)",
  },
];
