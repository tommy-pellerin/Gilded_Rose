import { Shop, Item } from "../components/gilded_rose.js";

describe("Gilded Rose", function() {

  // it("full test", () => {
  //   const items = [
  //     new Item("+5 Dexterity Vest", 10, 20), //reminder : item(name,sellIn,quality)
  //     new Item("Aged Brie", 2, 0),
  //     new Item("Elixir of the Mongoose", 5, 7),
  //     new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  //     new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

  //     // This Conjured item does not work properly yet
  //     new Item("Conjured Mana Cake", 3, 6),
  //   ];

  //   const days = Number(process.argv[2]) || 2; //process.argv[2] vu avec les algorithmes pour lire le troisième argument que passé à au script. ex: si on lance pnpm run test 10, alors process.argv[2] = 10
  //   const gildedRose = new Shop(items);

  //   for (let day = 0; day < days; day++) {
  //     console.log(`\n-------- day ${day} --------`);
  //     console.log("name, sellIn, quality");
  //     items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  //     gildedRose.updateQuality();
  //   }
  // });

    //Test if "Backstage passes" quality increase by 3 when SellIn < 6
    it("'Backstage passes' quality should increase by 3 when SellIn < 6", function() {
      const backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      const gildedRose = new Shop([backstagePasses]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    });
    //Test if "Sulfuras" quality and SellIn never change
    it("'Sulfuras' quality and SellIn never change", function() {
      const backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 2, 80)
      const gildedRose = new Shop([backstagePasses,sulfuras]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
      expect(items[1].quality).toBe(80);
      expect(items[1].sellIn).toBe(2)
    });
    //Test if quality always between 0 and 50 : 0 <= quality <= 50
    //Test if 
    it("0 <= quality <= 50", function() {
      const elexir = new Item("Elixir of the Mongoose", 1, 0)
      const brie = new Item("Aged Brie",5,50)
      const gildedRose = new Shop([elexir,brie]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[1].quality).toBe(50);
    });

});
