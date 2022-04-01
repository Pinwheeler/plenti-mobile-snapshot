const image_apples = require("./images/apples.jpg")
const image_apricots = require("./images/apricots.jpg")
const image_arugula = require("./images/arugula.jpg")
const image_asparagus = require("./images/asparagus.jpg")
const image_bananas = require("./images/bananas.jpg")
const image_basil = require("./images/basil.jpg")
const image_beets = require("./images/beets.jpg")
const image_bell_peppers = require("./images/bell_peppers.jpg")
const image_blackberries = require("./images/blackberries.jpg")
const image_blueberries = require("./images/blueberries.jpg")
const image_broccoli = require("./images/broccoli.jpg")
const image_brussels_sprouts = require("./images/brussels_sprouts.jpg")
const image_cabbage = require("./images/cabbage.jpg")
const image_cantaloupes = require("./images/cantaloupes.jpg")
const image_carrots = require("./images/carrots.jpg")
const image_celery = require("./images/celery.jpg")
const image_chives = require("./images/chives.jpg")
const image_cilantro = require("./images/cilantro.jpg")
const image_corn = require("./images/corn.jpg")
const image_cucumbers = require("./images/cucumbers.jpg")
const image_edamame = require("./images/edamame.jpg")
const image_eggplants = require("./images/eggplants.jpg")
const image_figs = require("./images/figs.jpg")
const image_garlic = require("./images/garlic.jpg")
const image_grapes = require("./images/grapes.jpg")
const image_kale = require("./images/kale.jpg")
const image_lemons = require("./images/lemons.jpg")
const image_lettuce = require("./images/lettuce.jpg")
const image_onions = require("./images/onions.jpg")
const image_oranges = require("./images/oranges.jpg")
const image_oregano = require("./images/oregano.jpg")
const image_parsley = require("./images/parsley.jpg")
const image_parsnips = require("./images/parsnips.jpg")
const image_peaches = require("./images/peaches.jpg")
const image_pears = require("./images/pears.jpg")
const image_peas = require("./images/peas.jpg")
const image_plums = require("./images/plums.jpg")
const image_potatoes = require("./images/potatoes.jpg")
const image_pumpkins = require("./images/pumpkins.jpg")
const image_radishes = require("./images/radishes.jpg")
const image_raspberries = require("./images/raspberries.jpg")
const image_rosemary = require("./images/rosemary.jpg")
const image_rutabagas = require("./images/rutabagas.jpg")
const image_sage = require("./images/sage.jpg")
const image_strawberries = require("./images/strawberries.jpg")
const image_thyme = require("./images/thyme.jpg")
const image_tomatoes = require("./images/tomatoes.jpg")
const image_watermelon = require("./images/watermelon.jpg")

export type ProduceType = "vegetable" | "herb" | "fruit"

export interface PlentiItem {
  name: string
  type: ProduceType
  localImage: any
}

export const AllPlentiItems: PlentiItem[] = [
  { localImage: image_apples, type: "fruit", name: "apples" },
  { localImage: image_arugula, type: "vegetable", name: "arugula" },
  { localImage: image_asparagus, type: "vegetable", name: "asparagus" },
  { localImage: image_beets, type: "vegetable", name: "beets" },
  {
    localImage: image_bell_peppers,
    type: "vegetable",
    name: "bell peppers",
  },
  {
    localImage: image_blackberries,
    type: "fruit",
    name: "blackberries",
  },
  { localImage: image_broccoli, type: "vegetable", name: "broccoli" },
  {
    localImage: image_brussels_sprouts,
    type: "vegetable",
    name: "brussels sprouts",
  },
  { localImage: image_cabbage, type: "vegetable", name: "cabbage" },
  { localImage: image_cantaloupes, type: "fruit", name: "cantaloupes" },
  { localImage: image_carrots, type: "vegetable", name: "carrots" },
  { localImage: image_celery, type: "vegetable", name: "celery" },
  { localImage: image_corn, type: "vegetable", name: "corn" },
  { localImage: image_cucumbers, type: "vegetable", name: "cucumbers" },
  { localImage: image_edamame, type: "vegetable", name: "edamame" },
  { localImage: image_eggplants, type: "vegetable", name: "eggplants" },
  { localImage: image_figs, type: "fruit", name: "figs" },
  { localImage: image_garlic, type: "herb", name: "garlic" },
  { localImage: image_grapes, type: "fruit", name: "grapes" },
  { localImage: image_lemons, type: "fruit", name: "lemons" },
  { localImage: image_lettuce, type: "vegetable", name: "lettuce" },
  { localImage: image_onions, type: "vegetable", name: "onions" },
  { localImage: image_oranges, type: "fruit", name: "oranges" },
  { localImage: image_parsnips, type: "vegetable", name: "parsnips" },
  { localImage: image_peaches, type: "fruit", name: "peaches" },
  { localImage: image_pears, type: "fruit", name: "pears" },
  { localImage: image_peas, type: "vegetable", name: "peas" },
  { localImage: image_plums, type: "fruit", name: "plums" },
  { localImage: image_pumpkins, type: "fruit", name: "pumpkins" },
  { localImage: image_radishes, type: "vegetable", name: "radishes" },
  { localImage: image_raspberries, type: "fruit", name: "raspberries" },
  { localImage: image_rosemary, type: "herb", name: "rosemary" },
  { localImage: image_rutabagas, type: "vegetable", name: "rutabagas" },
  { localImage: image_sage, type: "herb", name: "sage" },
  { localImage: image_tomatoes, type: "vegetable", name: "tomatoes" },
  { localImage: image_kale, type: "vegetable", name: "kale" },
  { localImage: image_basil, type: "herb", name: "basil" },
  { localImage: image_oregano, type: "herb", name: "oregano" },
  { localImage: image_blueberries, type: "fruit", name: "blueberries" },
  { localImage: image_potatoes, type: "vegetable", name: "potatoes" },
  { localImage: image_parsley, type: "herb", name: "parsley" },
  { localImage: image_thyme, type: "herb", name: "thyme" },
  { localImage: image_cilantro, type: "herb", name: "cilantro" },
  { localImage: image_chives, type: "herb", name: "chives" },
  { localImage: image_apricots, type: "fruit", name: "apricots" },
  { localImage: image_bananas, type: "fruit", name: "banana" },
  { localImage: image_watermelon, type: "fruit", name: "watermelon" },
  {
    localImage: image_strawberries,
    type: "fruit",
    name: "strawberries",
  },
]

export const plentiItems = [...AllPlentiItems].sort((a: PlentiItem, b: PlentiItem) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name < b.name) {
    return 1
  }
  return 0
})

export const itemForName = (name: string) => plentiItems.find((item) => item.name === name)
