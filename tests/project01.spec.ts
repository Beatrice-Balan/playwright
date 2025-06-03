import { test, expect, Locator } from '@playwright/test'

test.describe('To-Do App Verification', () => {
    let newTodoInput: Locator
    let addButton: Locator
    let searchField: Locator
    let todoItemList: Locator

    test.beforeEach(async({ page }) => {
        await page.goto('https://techglobal-training.com/frontend/todo-list')

        newTodoInput = page.getByRole('textbox', {name: 'New todo'})
        searchField = page.getByRole('textbox', { name: 'Type to search' })
        addButton = page.getByRole('button', { name: 'ADD' })
        todoItemList = page.locator('#panel .todo-item')
    })

/* Test Case 01 - Todo-App Modal Verification
Navigate to https://techglobal-training.com/frontend/todo-list.
Confirm that the todo-app modal is visible with the title “My Tasks.”
Validate that the New todo input field is enabled for text entry.
Validate ADD button is enabled.
Validate Search field is enabled.
Validate that the task list is empty, displaying the message “No tasks found!”
*/

    test('Test Case 01 - Todo-App Modal Verification', async( {page }) => {
        await expect(page.locator('.panel')).toContainText('My Tasks')

        const locators = [newTodoInput, searchField, addButton]

        for(let locator of locators) {
            await expect(locator).toBeEnabled()
        }

        await expect(page.getByText('No tasks found!')).toBeVisible()

        // await expect(page.locator('#input-add')).toBeEnabled()
        // await expect(page.locator('#search')).toBeEnabled()
        // await expect(page.locator('#add-btn')).toBeEnabled()
    })


/* Test Case 02 - Single Task Addition and Removal
Enter a new task in the todo input field and add it to the list.
Validate that the new task appears in the task list.
Validate that the number of tasks in the list is exactly one.

Mark the task as completed by clicking on it.
Validate item is marked as completed.

Click on the button to remove the item you have added.
Remove the completed task by clicking the designated removal button.
Validate that the task list is empty, displaying the message “No tasks found!”.
*/

    test('Test Case 02 - Single Task Addition and Removal', async( {page }) => {
        const newTask = 'Read a new book'
        // add task
        await newTodoInput.fill(newTask)
        await addButton.click()
        await expect(todoItemList).toContainText(newTask)
        await expect(todoItemList).toHaveCount(1)

        // mark as completed
        await todoItemList.locator('div.toggle').click()
        await expect(todoItemList.locator('span.panel-icon.has-text-success')).toBeVisible()
    
        // delete task
        await todoItemList.locator('.destroy').click()
        await expect(page.getByText('No tasks found!')).toBeVisible()
    })

/* Test Case 03 - Multiple Task Operations
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.

Mark all the tasks as completed by clicking on them.
Click on the “Remove completed tasks!” button to clear them.
Validate that the task list is empty, displaying the message “No tasks found!”.
*/

    test('Test Case 03 - Multiple Task Operations', async( {page }) => {
        const taskList = ['Read a new book', 'Learn how to juggle', 'Buy groceries', 'Pay bills', 'Go skydiving']
        
        // add all
        for(const task of taskList) {
            await newTodoInput.fill(task)
            await addButton.click()
        }

        // check all
        const itemsText = await todoItemList.allTextContents()
        for(const task of taskList) {
             expect(itemsText).toContain(task)
        }        

            //Mark all the tasks as completed by clicking on them.
        const taskListLocators = await todoItemList.all()
        for(const item of taskListLocators) {
            await item.locator('div.toggle').click()
        }

        await page.locator('#clear').click()
        await expect(page.getByText('No tasks found!')).toBeVisible()
    })

/* Test Case 04 - Search and Filter Functionality in todo App
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.

Enter the complete name of the previously added to-do item into the search bar.

Validate that the list is now filtered to show only the item you searched for.
Validate that the number of tasks visible in the list is exactly one.
*/

    test('Test Case 04 -Search and Filter Functionality in todo App', async( {page }) => {
        const taskList = ['Read a new book', 'Learn how to juggle', 'Buy groceries', 'Pay bills', 'Go skydiving']
        
        // add all
        for(const task of taskList) {
            await newTodoInput.fill(task)
            await addButton.click()
        }

        // check all
        const itemsText = await todoItemList.allTextContents()
        for(const task of taskList) {
             expect(itemsText).toContain(task)
        }       
        
        //Enter the complete name of the previously added to-do item into the search bar.
        await searchField.fill(taskList[4])

        await expect(todoItemList).toContainText(taskList[4])
        await expect(todoItemList).toHaveCount(1)
    })


/* Test Case 05 - Task Validation and Error Handling
Attempt to add an empty task to the to-do list.
Validate that the task list is empty, displaying the message “No task found!”.

Enter an item name exceeding 30 characters into the list.
Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.

Add a valid item name to the list.
Validate that the active task count is exactly one.
Try to enter an item with the same name already present on the list.
Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
*/

    test('Test Case 05 - Task Validation and Error Handling', async( {page }) => {
         await addButton.click()
         await expect(page.getByText('No tasks found!')).toBeVisible()

        const longTask = `A software tester walks into a bar. Runs into a bar. Crawls into a bar. Dances into a bar. Flies into a bar. Jumps into a bar.
                        And orders: a beer. 2 beers. 0 beers. 99999999 beers. a lizard in a beer glass. -1 beer. "qwertyuiop" beers.
                        Testing complete.

                        A real customer walks into the bar and asks where the bathroom is.
                        The bar goes up in flames.`

        await newTodoInput.fill(longTask)
        await addButton.click()
        await expect(page.getByText('Error: Todo cannot be more than 30 characters!')).toBeVisible()
         
        // add valid task
        const validTask = 'Crack a joke'
        await newTodoInput.fill(validTask)
        await addButton.click()
        expect(todoItemList).toContainText(validTask)

        // re-add
        await newTodoInput.fill(validTask)
        await addButton.click()
        await expect(page.getByText(`Error: You already have ${validTask} in your todo list.`)).toBeVisible()
    })
})