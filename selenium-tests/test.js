const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testTicTacToe() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        const testUrl = process.env.TEST_URL || 'http://localhost:8000';
        
        console.log(`Testing: ${testUrl}`);
        await driver.get(testUrl);

       
        await driver.sleep(2000);

       
        const board = await driver.findElement(By.id('board'));
        console.log('✓ Game board found');

       
        const cells = await driver.findElements(By.className('cell'));
        
        if (cells.length !== 9) {
            throw new Error('Board should have 9 cells');
        }
        console.log('✓ Board has 9 cells');


        await cells[0].click(); // X
        await driver.sleep(500);
        await cells[3].click(); // O
        await driver.sleep(500);
        await cells[1].click(); // X
        await driver.sleep(500);
        await cells[4].click(); // O
        await driver.sleep(500);
        await cells[2].click(); // X 
        await driver.sleep(1000);

        const winner = await driver.findElement(By.id('winner'));
        const winnerText = await winner.getText();
        
        if (winnerText.includes('X wins') || winnerText.includes('X venceu')) {
            console.log('✓ Winner detection works correctly');
            console.log('\n✅ ALL TESTS PASSED');
            process.exit(0);
        } else {
            throw new Error(`Expected X to win, but got: ${winnerText}`);
        }

    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
        process.exit(1);
    } finally {
        await driver.quit();
    }
}

testTicTacToe();
