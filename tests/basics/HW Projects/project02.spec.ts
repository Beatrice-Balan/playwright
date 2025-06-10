// Shopping Cart task

import { test, expect } from '@playwright/test'
import { ShoppingCartPage } from '../../../pages/ShoppingCartPage'


test.describe('Project 2 - Shopping Cart Validation', () => {
    let shoppingCartPage: ShoppingCartPage

    test.beforeEach(async({ page }) => {
        shoppingCartPage = new ShoppingCartPage(page)
            await page.goto('https://www.techglobal-training.com/frontend/shopping-cart')
        })

/* Test Case 1
Validate the heading is “Available Courses”
Validate that there are 3 courses displayed
Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero
Validate the first 2 courses have discount tags
Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”
*/

    test('Test Case 01 - Available Courses Section Validation', async({ page }) => {
        await expect(shoppingCartPage.coursesHeader).toHaveText('Available Courses')
        await expect(shoppingCartPage.allCourses).toHaveCount(3)

        const courseCount = await shoppingCartPage.allCourses.count()

        for(let i = 0; i < courseCount; i++) {
            await shoppingCartPage.validateCourseElements(i)
        }

        for (let i = 0; i < 2; i++) {
            await shoppingCartPage.validateDiscountTag(i);
        }

    })


   /* Test case 2
Navigate to https://techglobal-training.com/frontend/shopping-cart
Validate the heading is “Items Added to Cart”
Validate that the cart is empty by default
Validate that the total price is zero “$0” by default
Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
   */

    test('Test Case 02 - Cart Section Validation', async({ page }) => {
        await expect(shoppingCartPage.cartHeading).toHaveText('Items Added to Cart')

        await shoppingCartPage.checkForEmptyCart()
        await expect(shoppingCartPage.totalPrice).toHaveText('Total: $0')

        await expect(shoppingCartPage.placeOrderBtn).toBeVisible()
        await expect(shoppingCartPage.placeOrderBtn).toBeDisabled()
        await expect(shoppingCartPage.placeOrderBtn).toHaveText('Place Order')

    })

    /* Test Case 3
Click on the “Add to Cart” button for one of the courses
Validate that the course is displayed in the cart with its image, name, and discount amount if available
Validate that the course price is added to the total price excluding the discount amount

Click on the “Place Order” button
Validate a success message is displayed with the text “Your order has been placed.”
Validate that the cart is empty
    */

    test('Test Case 03 - Add a Course to the Cart and Validate', async({ page }) => {

        await shoppingCartPage.addToCartByCourseName('SDET Course | Cypress Playwright')
        await shoppingCartPage.checkCourseInCartDetails('SDET Course | Cypress Playwright')

        await shoppingCartPage.checkTotalAmount()

        await shoppingCartPage.placeOrderBtn.click()
        await shoppingCartPage.orderPlacedSuccessMessageVissible()
        await shoppingCartPage.checkForEmptyCart()
    })

    /*  Test Case 04 - Add Two Courses to the Cart and Validate
Click on the “Add to Cart” button for one of the courses
Click on the “Add to Cart” button for another course

Validate that the courses are displayed in the cart with their image, name, and discount amount if available
Validate that the course prices are added to the total price excluding the discount amounts
Click on the “Place Order” button
Validate a success message is displayed with the text “Your order has been placed.”
Validate that the cart is empty
*/
    test('Test Case 04 - Add Two Courses to the Cart and Validate', async({ page }) => {
        await shoppingCartPage.addToCartByCourseName('Playwright Automation Testing')
        await shoppingCartPage.addToCartByCourseName('Cypress Automation Course')

        await shoppingCartPage.checkCourseInCartDetails('Playwright Automation Testing')
        await shoppingCartPage.checkCourseInCartDetails('Cypress Automation Course')

        await shoppingCartPage.checkTotalAmount()

        await shoppingCartPage.placeOrderBtn.click()
        await shoppingCartPage.orderPlacedSuccessMessageVissible()
        await shoppingCartPage.checkForEmptyCart()
    })

    /*  Test Case 05 - Add All Three Courses to the Cart and Validate
Click on the “Add to Cart” button for all three courses
Validate that the courses are displayed in the cart with their image, name, and discount amount if available
Validate that the course prices are added to the total price excluding the discount amounts
Click on the “Place Order” button
Validate a success message is displayed with the text “Your order has been placed.”
Validate that the cart is empty
*/
    test('Test Case 05 - Add All Three Courses to the Cart and Validate', async({ page }) => {
        const coursesToAdd = ['SDET Course | Cypress Playwright', 'Playwright Automation Testing', 'Cypress Automation Course']
        
        for (const course of coursesToAdd) {
            await shoppingCartPage.addToCartByCourseName(course)
            await shoppingCartPage.checkCourseInCartDetails(course)
        }

        await shoppingCartPage.checkTotalAmount()

        await shoppingCartPage.placeOrderBtn.click()
        await shoppingCartPage.orderPlacedSuccessMessageVissible()
        await shoppingCartPage.checkForEmptyCart()
    
    })


})