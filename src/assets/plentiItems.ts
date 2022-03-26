export type ProduceType = "vegetable" | "herb" | "fruit";

export interface PlentiItem {
  id: number;
  name: string;
  type: ProduceType;
  filename: string;
}

export const AllPlentiItems: PlentiItem[] = [
  { id: 15, type: "vegetable", name: "edamame", filename: "edamame.jpg" },
  { id: 32, type: "herb", name: "rosemary", filename: "rosemary.jpg" },
  { id: 25, type: "fruit", name: "peaches", filename: "peaches.jpg" },
  { id: 22, type: "vegetable", name: "onions", filename: "onions.jpg" },
  { id: 10, type: "fruit", name: "cantaloupes", filename: "cantaloupes.jpg" },
  { id: 28, type: "fruit", name: "plums", filename: "plums.jpg" },
  { id: 3, type: "vegetable", name: "asparagus", filename: "asparagus.jpg" },
  { id: 23, type: "fruit", name: "oranges", filename: "oranges.jpg" },
  { id: 17, type: "fruit", name: "figs", filename: "figs.jpg" },
  { id: 7, type: "vegetable", name: "broccoli", filename: "broccoli.jpg" },
  { id: 27, type: "vegetable", name: "peas", filename: "peas.jpg" },
  { id: 18, type: "herb", name: "garlic", filename: "garlic.jpg" },
  { id: 24, type: "vegetable", name: "parsnips", filename: "parsnips.jpg" },
  {
    id: 5,
    type: "vegetable",
    name: "bell peppers",
    filename: "bell_peppers.jpg",
  },
  { id: 2, type: "vegetable", name: "arugula", filename: "arugula.jpg" },
  { id: 4, type: "vegetable", name: "beets", filename: "beets.jpg" },
  {
    id: 8,
    type: "vegetable",
    name: "brussels sprouts",
    filename: "brussels_sprouts.jpg",
  },
  { id: 11, type: "vegetable", name: "carrots", filename: "carrots.jpg" },
  { id: 14, type: "vegetable", name: "cucumbers", filename: "cucumbers.jpg" },
  { id: 1, type: "fruit", name: "apples", filename: "apples.jpg" },
  { id: 26, type: "fruit", name: "pears", filename: "pears.jpg" },
  { id: 19, type: "fruit", name: "grapes", filename: "grapes.jpg" },
  { id: 13, type: "vegetable", name: "corn", filename: "corn.jpg" },
  { id: 9, type: "vegetable", name: "cabbage", filename: "cabbage.jpg" },
  { id: 34, type: "herb", name: "sage", filename: "sage.jpg" },
  { id: 33, type: "vegetable", name: "rutabagas", filename: "rutabagas.jpg" },
  { id: 20, type: "fruit", name: "lemons", filename: "lemons.jpg" },
  { id: 30, type: "vegetable", name: "radishes", filename: "radishes.jpg" },
  { id: 6, type: "fruit", name: "blackberries", filename: "blackberries.jpg" },
  { id: 29, type: "fruit", name: "pumpkins", filename: "pumpkins.jpg" },
  { id: 16, type: "vegetable", name: "eggplants", filename: "eggplants.jpg" },
  { id: 12, type: "vegetable", name: "celery", filename: "celery.jpg" },
  { id: 21, type: "vegetable", name: "lettuce", filename: "lettuce.jpg" },
  { id: 35, type: "vegetable", name: "tomatoes", filename: "tomatoes.jpg" },
  { id: 36, type: "vegetable", name: "kale", filename: "kale.jpg" },
  { id: 37, type: "herb", name: "basil", filename: "basil.jpg" },
  { id: 38, type: "herb", name: "oregano", filename: "oregano.jpg" },
  { id: 39, type: "fruit", name: "blueberries", filename: "blueberries.jpg" },
  { id: 40, type: "vegetable", name: "potatoes", filename: "potatoes.jpg" },
  { id: 41, type: "herb", name: "parsley", filename: "parsley.jpg" },
  { id: 42, type: "herb", name: "thyme", filename: "thyme.jpg" },
  { id: 43, type: "herb", name: "cilantro", filename: "cilantro.jpg" },
  { id: 44, type: "herb", name: "chives", filename: "chives.jpg" },
  { id: 31, type: "fruit", name: "raspberries", filename: "raspberries.jpg" },
  { id: 52, type: "fruit", name: "apricots", filename: "apricots.jpg" },
  { id: 53, type: "fruit", name: "banana", filename: "bananas.jpg" },
  { id: 54, type: "fruit", name: "watermelon", filename: "watermelon.jpg" },
  { id: 55, type: "fruit", name: "strawberries", filename: "strawberries.jpg" },
];
