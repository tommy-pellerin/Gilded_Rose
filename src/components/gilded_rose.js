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
  decreaseQuality(i){
    if (this.items[i].quality > 0) { //condition to decrease only if quality > 0 (quality min = 0) and if is not 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert'
      this.decreaseQualityBy1(i);
      this.ifConjuredItem(i);
    }
  }
  // decreaseQualityBy1ExceptSulfuras(i){
  //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //if is not sulfuras, deccrease by 1/day => condition to not touch sulfuras quality
  //     this.decreaseQualityBy1(i);
  //   }
  // }
  increaseQualityBy1(i){
    return this.items[i].quality = this.items[i].quality + 1;
  }
  increaseQuality(i){
    if (this.items[i].quality < 50) { //condition to increase only if quality < 50 (quality max = 50) and if is 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert' and quality < 50
      this.increaseQualityBy1(i);
      this.ifBackstagePassesToATAFKAL80ETCConcert(i);
    }
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
  ifConjuredItem(i){
    if (this.items[i].quality > 0) {
      if(this.items[i].name.toLowerCase().includes('conjured')){
        this.decreaseQualityBy1(i)
      }
    }
  }
  putQUalityTo0(i){
    this.items[i].quality = this.items[i].quality - this.items[i].quality; //put quality to 0 when the concert is over
  }
  
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      
      if(this.items[i].name != 'Sulfuras, Hand of Ragnaros'){

        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') { //if is not 'Aged Brie' and 'Backstage passes to a TAFKAL80ETC concert'
          this.decreaseQuality(i)
        } else {
          this.increaseQuality(i)
        }
  
        //decrease SellIn by 1 for every item except sulfuras
        this.decreaseSellIn(i);
  
        //Once the sell by date has passed
        if (this.items[i].sellIn < 0) { 
          switch(this.items[i].name){
            case 'Aged Brie': //quanlity of 'Aged Brie increase by 1 again ?
              this.increaseQuality(i)
              break;
            case 'Backstage passes to a TAFKAL80ETC concert':
              this.putQUalityTo0(i)
              break;
            default:
              this.decreaseQuality(i)
          }//end switch
        }

      }//end of sulfuras if
    }

    return this.items;
  }
}
