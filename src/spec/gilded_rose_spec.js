import { Shop, Item } from "../components/gilded_rose.js";

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //reminder : item(name,sellIn,quality)
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2; //process.argv[2] vu avec les algorithmes pour lire le troisième argument que passé à au script. ex: si on lance pnpm run test 10, alors process.argv[2] = 10
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

    //1.Test if "Backstage passes" quality increase by 3 when SellIn < 6
    it("'Backstage passes' quality should increase by 3 when SellIn < 6", function() {
      const backstagePasses1 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)
      const backstagePasses2 = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10)
      const backstagePasses3 = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 45)
      const gildedRose = new Shop([backstagePasses1,backstagePasses2,backstagePasses3]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3);
      expect(items[1].quality).toBe(13);
      expect(items[2].quality).toBe(48);
    });
    //2.Test if "Backstage passes" quality increase by 2 when 5 < SellIn < 11
    it("'Backstage passes' quality should increase by 2 when SellIn < 11 but > 5", function() {
      const backstagePasses1 = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0)
      const backstagePasses2 = new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)
      const backstagePasses3 = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 45)
      const gildedRose = new Shop([backstagePasses1,backstagePasses2,backstagePasses3]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
      expect(items[1].quality).toBe(12);
      expect(items[2].quality).toBe(47);
    });
    //3.Test if "Backstage passes" quality = 0 when SellIn = 0
    it("'Backstage passes' quality should be 0 when SellIn = 0", function() {
      const backstagePasses1 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)
      const backstagePasses2 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
      const backstagePasses3 = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50)
      const gildedRose = new Shop([backstagePasses1,backstagePasses2,backstagePasses3]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[1].quality).toBe(0);
      expect(items[2].quality).toBe(0);
    });
    //4.Test if "Sulfuras" quality never change
    //5.Test if "Sulfuras" SellIn never change
    it("'Sulfuras' quality and SellIn never change", function() {
      const sulfuras1 = new Item("Sulfuras, Hand of Ragnaros", 2, 80);
      const sulfuras2 = new Item("Sulfuras, Hand of Ragnaros", 18, 80);
      const sulfuras3 = new Item("Sulfuras, Hand of Ragnaros", -5, 80);
      const sulfuras4 = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const gildedRose = new Shop([sulfuras1,sulfuras2,sulfuras3,sulfuras4]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[1].quality).toBe(80);
      expect(items[2].sellIn).toBe(-5);
      expect(items[3].sellIn).toBe(0);
    });
    //6.Test if quality -2 if the item is conjured
    it("Conjured item quality should degrade twice as fast as normal items", function() {
      const conjuredItem1 = new Item("Apple Conjured",7,10)
      const conjuredItem2 = new Item("Conjured pen",-100,50)
      const conjuredItem3 = new Item("Conjured salted peanuts",5,25)
      const gildedRose = new Shop([conjuredItem1,conjuredItem2,conjuredItem3]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[1].quality).toBe(46);
      expect(items[2].quality).toBe(23);
    });
    //7-8.Test if quality always between 0 and 50 : 0 <= quality <= 50
    it("0 <= quality <= 50", function() {
      const elexir = new Item("Elixir of the Mongoose", 1, 0)
      const brie = new Item("Aged Brie",5,50)
      const conjuredItem = new Item("Conjured pen",-3,1)
      const backstagePasse = new Item("Backstage passes to a TAFKAL80ETC concert",3,48)
      const gildedRose = new Shop([elexir,brie,conjuredItem,backstagePasse]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[1].quality).toBe(50);
      expect(items[2].quality).toBe(0);
      expect(items[3].quality).toBe(50);
    });
    //9.Test if quality -2 if the item is conjured
    it("Conjured item quality should degrade twice as fast as normal items", function() {
      const dextVase = new Item("+5 Dexterity Vest",0,10)
      const dextVase2 = new Item("+5 Dexterity Vest",-3,10)
      const conjuredItem1 = new Item("Conjured pen",0,50)
      const conjuredItem2 = new Item("Conjured pen",-100,50)
      const gildedRose = new Shop([dextVase,dextVase2,conjuredItem1,conjuredItem2]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[1].quality).toBe(8);
      expect(items[2].quality).toBe(46);
      expect(items[2].quality).toBe(46);
    });
});
