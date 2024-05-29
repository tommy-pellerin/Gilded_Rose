export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  decreaseQualityBy1(i){
    return this.items[i].quality = this.items[i].quality - 1;
  }
  decreaseQualityBy1ExceptSulfuras(i){
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //if is not sulfuras, deccrease by 1/day => condition to not touch sulfuras quality
      this.decreaseQualityBy1(i);
    }
  }
  increaseQualityBy1(i){
    return this.items[i].quality = this.items[i].quality + 1;
  }
  decreaseSellIn(i){
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }
  ifBackstagePassesToATAFKAL80ETCConcert(i){
    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') { //only backstage passes is concerned by the following code
      if (this.items[i].sellIn < 11) {
        if (this.items[i].quality < 50) { //condition to increase only if quality < 50 (quality max = 50)
          this.increaseQualityBy1(i);
        }
      }
      if (this.items[i].sellIn < 6) {
        if (this.items[i].quality < 50) { //condition to increase only if quality < 50 (quality max = 50)
          this.increaseQualityBy1(i);
        }
      }
    }
  }
  
  
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') { //if is not 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert'
        if (this.items[i].quality > 0) { //condition to decrease only if quality > 0 (quality min = 0) and if is not 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert'
          this.decreaseQualityBy1ExceptSulfuras(i)
        }
      } else {
        if (this.items[i].quality < 50) { //condition to increase only if quality < 50 (quality max = 50) and if is 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert' and quality < 50
          this.increaseQualityBy1(i);
          this.ifBackstagePassesToATAFKAL80ETCConcert(i);
        }
      }

      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //decrease SellIn by 1 for every item except sulfuras
        this.decreaseSellIn(i);
      }

      if (this.items[i].sellIn < 0) { //Once the sell by date has passed
        switch(this.items[i].name){
          case 'Aged Brie':
            if (this.items[i].quality < 50) { //condition to increase only if quality < 50 (quality max = 50)
              this.increaseQualityBy1(i);
            }
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
            this.items[i].quality = this.items[i].quality - this.items[i].quality; //put quality to 0 when the concert is over
            break;
          default:
            if (this.items[i].quality > 0) { //condition to decrease only if quality > 0 (quality min = 0)
              this.decreaseQualityBy1ExceptSulfuras(i)
            }
        }
      }

      

    }

    return this.items;
  }
}
