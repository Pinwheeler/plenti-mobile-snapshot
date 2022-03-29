const image_apples = require("./images/apples.jpg");
const image_apricots = require("./images/apricots.jpg");
const image_arugula = require("./images/arigula.jpg");
const image_asparagus = require("./images/asparagus.jpg");
const image_bananas = require("./images/bananas.jpg");
const image_basil = require("./images/basil.jpg");
const image_beets = require("./images/beets.jpg");
const image_bell_peppers = require("./images/bell_peppers.jpg");
const image_blackberries = require("./images/blackberries.jpg");
const image_blueberries = require("./images/blueberries.jpg");
const image_broccoli = require("./images/broccoli.jpg");
const image_brussels_sprouts = require("./images/brussels_sprouts.jpg");
const image_cabbage = require("./images/cabbage.jpg");
const image_cantaloupes = require("./images/cantaloupes.jpg");
const image_carrots = require("./images/carrots.jpg");
const image_celery = require("./images/celery.jpg");
const image_chives = require("./images/chives.jpg");
const image_cilantro = require("./images/cilantro.jpg");
const image_corn = require("./images/corn.jpg");
const image_cucumbers = require("./images/cucumbers.jpg");
const image_edamame = require("./images/edamame.jpg");
const image_eggplants = require("./images/eggplants.jpg");
const image_figs = require("./images/figs.jpg");
const image_garlic = require("./images/garlic.jpg");
const image_grapes = require("./images/grapes.jpg");
const image_kale = require("./images/kale.jpg");
const image_lemons = require("./images/lemons.jpg");
const image_lettuce = require("./images/lettuce.jpg");
const image_onions = require("./images/onions.jpg");
const image_oranges = require("./images/oranges.jpg");
const image_oregano = require("./images/oregano.jpg");
const image_parsley = require("./images/parsley.jpg");
const image_parsnips = require("./images/parsnips.jpg");
const image_peaches = require("./images/peaches.jpg");
const image_pears = require("./images/pears.jpg");
const image_peas = require("./images/peas.jpg");
const image_plums = require("./images/plums.jpg");
const image_potatoes = require("./images/potatoes.jpg");
const image_pumpkins = require("./images/pumpkins.jpg");
const image_radishes = require("./images/radishes.jpg");
const image_raspberries = require("./images/raspberries.jpg");
const image_rosemary = require("./images/rosemary.jpg");
const image_rutabagas = require("./images/rutabagas.jpg");
const image_sage = require("./images/sage.jpg");
const image_strawberries = require("./images/strawberries.jpg");
const image_thyme = require("./images/thyme.jpg");
const image_tomatoes = require("./images/tomatoes.jpg");
const image_watermelon = require("./images/watermelon.jpg");

export type ProduceType = "vegetable" | "herb" | "fruit";

export interface PlentiItem {
  id: number;
  name: string;
  type: ProduceType;
  localImage: any;
}

export const AllPlentiItems: PlentiItem[] = [
  { localImage: image_apples, id: 1, type: "fruit", name: "apples" },
  { localImage: image_arugula, id: 2, type: "vegetable", name: "arugula" },
  { localImage: image_asparagus, id: 3, type: "vegetable", name: "asparagus" },
  { localImage: image_beets, id: 4, type: "vegetable", name: "beets" },
  {
    localImage: image_bell_peppers,
    id: 5,
    type: "vegetable",
    name: "bell peppers",
  },
  {
    localImage: image_blackberries,
    id: 6,
    type: "fruit",
    name: "blackberries",
  },
  { localImage: image_broccoli, id: 7, type: "vegetable", name: "broccoli" },
  {
    localImage: image_brussels_sprouts,
    id: 8,
    type: "vegetable",
    name: "brussels sprouts",
  },
  { localImage: image_cabbage, id: 9, type: "vegetable", name: "cabbage" },
  { localImage: image_cantaloupes, id: 10, type: "fruit", name: "cantaloupes" },
  { localImage: image_carrots, id: 11, type: "vegetable", name: "carrots" },
  { localImage: image_celery, id: 12, type: "vegetable", name: "celery" },
  { localImage: image_corn, id: 13, type: "vegetable", name: "corn" },
  { localImage: image_cucumbers, id: 14, type: "vegetable", name: "cucumbers" },
  { localImage: image_edamame, id: 15, type: "vegetable", name: "edamame" },
  { localImage: image_eggplants, id: 16, type: "vegetable", name: "eggplants" },
  { localImage: image_figs, id: 17, type: "fruit", name: "figs" },
  { localImage: image_garlic, id: 18, type: "herb", name: "garlic" },
  { localImage: image_grapes, id: 19, type: "fruit", name: "grapes" },
  { localImage: image_lemons, id: 20, type: "fruit", name: "lemons" },
  { localImage: image_lettuce, id: 21, type: "vegetable", name: "lettuce" },
  { localImage: image_onions, id: 22, type: "vegetable", name: "onions" },
  { localImage: image_oranges, id: 23, type: "fruit", name: "oranges" },
  { localImage: image_parsnips, id: 24, type: "vegetable", name: "parsnips" },
  { localImage: image_peaches, id: 25, type: "fruit", name: "peaches" },
  { localImage: image_pears, id: 26, type: "fruit", name: "pears" },
  { localImage: image_peas, id: 27, type: "vegetable", name: "peas" },
  { localImage: image_plums, id: 28, type: "fruit", name: "plums" },
  { localImage: image_pumpkins, id: 29, type: "fruit", name: "pumpkins" },
  { localImage: image_radishes, id: 30, type: "vegetable", name: "radishes" },
  { localImage: image_raspberries, id: 31, type: "fruit", name: "raspberries" },
  { localImage: image_rosemary, id: 32, type: "herb", name: "rosemary" },
  { localImage: image_rutabagas, id: 33, type: "vegetable", name: "rutabagas" },
  { localImage: image_sage, id: 34, type: "herb", name: "sage" },
  { localImage: image_tomatoes, id: 35, type: "vegetable", name: "tomatoes" },
  { localImage: image_kale, id: 36, type: "vegetable", name: "kale" },
  { localImage: image_basil, id: 37, type: "herb", name: "basil" },
  { localImage: image_oregano, id: 38, type: "herb", name: "oregano" },
  { localImage: image_blueberries, id: 39, type: "fruit", name: "blueberries" },
  { localImage: image_potatoes, id: 40, type: "vegetable", name: "potatoes" },
  { localImage: image_parsley, id: 41, type: "herb", name: "parsley" },
  { localImage: image_thyme, id: 42, type: "herb", name: "thyme" },
  { localImage: image_cilantro, id: 43, type: "herb", name: "cilantro" },
  { localImage: image_chives, id: 44, type: "herb", name: "chives" },
  { localImage: image_apricots, id: 52, type: "fruit", name: "apricots" },
  { localImage: image_bananas, id: 53, type: "fruit", name: "banana" },
  { localImage: image_watermelon, id: 54, type: "fruit", name: "watermelon" },
  {
    localImage: image_strawberries,
    id: 55,
    type: "fruit",
    name: "strawberries",
  },
];
