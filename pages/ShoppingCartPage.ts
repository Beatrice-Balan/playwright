import { expect, Locator, Page } from '@playwright/test'

export class ShoppingCartPage {
    readonly page: Page
    readonly coursesHeader: Locator
    readonly allCourses: Locator
    readonly cartHeading: Locator
    readonly totalPrice: Locator

    readonly placeOrderBtn: Locator
    readonly successMessage: Locator
    readonly cartContainer: Locator
    readonly coursesInCart: Locator


constructor(page: Page) {
    this.page = page;
    this.coursesHeader = page.locator('h1[class^="mt-2"]')
    this.allCourses = page.locator('[class^="Project8_courseColumn"]')
    this.cartHeading = page.locator('p[class^="mb-2"]')
    this.totalPrice = page.locator('#total-price')
    this.placeOrderBtn = this.page.getByRole('button', { name: 'Place Order' })
    this.successMessage = this.page.locator('[class^="notification is-success"]')
    this.cartContainer = this.page.locator('div[class^="column p-0"]')
    this.coursesInCart = this.cartContainer.locator('[class^="course-card Project8"]')
  }

// Courses section

  async validateCourseElements(courseIndex: number) {
    const course = this.allCourses.nth(courseIndex)

    await expect(course.getByRole('img')).toBeVisible()
    await expect(course.locator('h3')).toBeVisible()
    await expect(course.locator('.my-3')).toHaveText('TechGlobal School')

    const priceText = await course.locator('p[data-testid="full-price"] strong').textContent()
    const price = Number(priceText?.replace('$', ''))
    expect(price).toBeGreaterThan(0)

    const addToCartButton = course.getByRole('button', { name: 'Add to Cart' })
    await expect(addToCartButton).toBeVisible()
    await expect(addToCartButton).toBeEnabled()
  }


  async validateDiscountTag(courseIndex: number) { 
    const course = this.allCourses.nth(courseIndex) 
    await expect(course.locator('[data-testid="discount"]')).toBeVisible()
  }

  async addToCartByCourseName(courseName: string) {
    const course = this.allCourses.filter({ hasText: courseName })
    await course.getByRole('button', { name: 'Add to Cart' }).click()
  }


// Cart section

async checkForEmptyCart() {
    await expect(this.coursesInCart).toHaveCount(0)
}

async orderPlacedSuccessMessageVissible(){
    await expect(this.successMessage).toBeVisible()
}

async checkCourseInCartDetails(courseName: string) {
  const courseInCart = this.coursesInCart.filter({ hasText: courseName })
  await expect(courseInCart).toBeVisible()
  await expect(courseInCart.locator('img')).toBeVisible()
  await expect(courseInCart.locator('.course-card-content p.has-text-black')).toHaveText(courseName)

  const discount = courseInCart.locator('span[data-testid="discount"]')
  if (await discount.count() > 0) {
    await expect(discount).toBeVisible()
  }
}

async checkTotalAmount() {
  const coursesCount = await this.coursesInCart.count()
  let calculatedTotal = 0

  for (let i = 0; i < coursesCount; i++) {
    const course = this.coursesInCart.nth(i)

    const priceText = (await course.locator('[data-testid="final-price"]').textContent()) || '0'
    const price = Number(priceText.replace('$', '').trim())

    calculatedTotal += price
  }

  const displayedTotalText = (await this.totalPrice.textContent()) || ''
  const displayedTotalPrice = Number(displayedTotalText.replace('Total: $', '').trim())

  expect(displayedTotalPrice).toEqual(calculatedTotal)
}


}



