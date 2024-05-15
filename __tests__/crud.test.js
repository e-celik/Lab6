const { Keyboard } = require("puppeteer");

describe('Basic user flow for Website', () => {
    beforeAll(async () => {
      await page.goto('https://e-celik.github.io/Lab6/');
    });

    it('Add a new note', async () => {
      const oldNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await page.$eval('.add-note', button => button.click());
      const newNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await expect(newNumNotes).toBe(1+oldNumNotes);
    });
    it('Add a new note', async () => {
      const oldNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await page.$eval('.add-note', button => button.click());
      const newNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await expect(newNumNotes).toBe(1+oldNumNotes);
    });

    it('Edit new note', async () => {
      const myNotes = await (page.$$('.note'));
      const myNote = myNotes[myNotes.length-1];
      let beforeText = await myNote.evaluate(element => element.value);

      await myNote.click();
      await page.keyboard.press('H');
      await page.keyboard.press('e');
      await page.keyboard.press('y');
      await page.keyboard.press(' ');
      await page.keyboard.press('y');
      await page.keyboard.press('o');
      await page.keyboard.press('u');
      await page.keyboard.press('!');
      await page.keyboard.press('Tab');

      let afterText = await myNote.evaluate(element => element.value)
      expect(beforeText + "Hey you!").toBe(afterText);
    });

    it('Edit some note', async () => {
      const myNote = (await (page.$$('.note')))[0];
      let beforeText = await myNote.evaluate(element => element.value);

      await myNote.click();
      await page.keyboard.press('O');
      await page.keyboard.press('u');
      await page.keyboard.press('t');
      await page.keyboard.press(' ');
      await page.keyboard.press('t');
      await page.keyboard.press('h');
      await page.keyboard.press('e');
      await page.keyboard.press('r');
      await page.keyboard.press('e');
      await page.keyboard.press(' ');
      await page.keyboard.press('i');
      await page.keyboard.press('n');
      await page.keyboard.press(' ');
      await page.keyboard.press('t');
      await page.keyboard.press('h');
      await page.keyboard.press('e');
      await page.keyboard.press(' ');
      await page.keyboard.press('c');
      await page.keyboard.press('o');
      await page.keyboard.press('l');
      await page.keyboard.press('d');
      await page.keyboard.press('!');
      

      await page.keyboard.press('Tab');

      let afterText = await myNote.evaluate(element => element.value)
      expect(beforeText + "Out there in the cold!").toBe(afterText);


    });



    

    it('Save Locally', async () => {
      let beforeStorage = await page.evaluate(() => {return window.localStorage.getItem('stickynotes-notes')});
      await page.reload();
      let afterStorage = await page.evaluate(() => {return window.localStorage.getItem('stickynotes-notes')});
      expect(beforeStorage).toBe(afterStorage);
    });

    it('Delete note', async () => {
      const oldNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await page.click('.note', {clickCount: 2});
      const newNumNotes = await page.$$eval('.note', (notes) => {
        return notes.length;
      });
      await expect(newNumNotes).toBe(oldNumNotes - 1);
    });
});