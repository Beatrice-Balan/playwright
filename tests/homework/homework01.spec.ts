import { test, expect } from '../../fixtures/test-data-fixtures';


/* TASK-1: Get All Students
Title: Retrieve all students and validate the response

Steps:
1.	Send a GET request to the endpoint to retrieve all students.
2.	Validate that the status code is 200.
3.	Validate that there are at least 2 students in the response.
4.	Validate that each student object has a property called STUDENT_ID.
*/

test.describe('Project 1', () => {
    let studentID


 test('Task 1: Retrieve all students and validate the response', async ({ request }) => {
  const response = await request.get(process.env.API_ENDPOINT!)
  expect(response.status()).toBe(200)

  const responseBody = await response.json()

  expect(responseBody.length).toBeGreaterThanOrEqual(2)

  for (const student of responseBody) {
    expect(student).toHaveProperty('STUDENT_ID')
  }

})


/* TASK-2: Create a New Student
Title: Create a new student and validate the response

Steps:
1.	Send a POST request to the endpoint to create a new student with the provided details.
2.	Validate that the status code is 201.
3.	Validate that the STUDENT_ID is greater than 2.
4.	Validate that the DOB matches the provided DOB.
5.	Validate that the EMAIL matches the provided EMAIL.
6.	Validate that the FIRST_NAME matches the provided FIRST_NAME.
7.	Validate that the LAST_NAME matches the provided LAST_NAME.
8.	Validate that the INSTRUCTOR_ID matches the provided INSTRUCTOR_ID.
*/

test('Task 2: Create a new student and validate the response', async ({ request, newStudent }) => {
  const response = await request.post(process.env.API_ENDPOINT!, {
    data: newStudent,
  })
  expect(response.status()).toBe(201)

  const responseBody = await response.json()
  studentID = responseBody.STUDENT_ID

  expect(studentID).toBeGreaterThan(2)

  for (const key in newStudent) {
    expect(responseBody[key]).toBe(newStudent[key])
  }
})

/* TASK-3: Get Newly Created Student
Title: Retrieve the newly created student and validate the response

Steps:
1.	Send a GET request to the endpoint to retrieve the newly created student using STUDENT_ID.
2.	Validate that the status code is 200.
3.	Validate that the STUDENT_ID matches the provided STUDENT_ID.
4.	Validate that the DOB matches the provided DOB.
5.	Validate that the EMAIL matches the provided EMAIL.
6.	Validate that the FIRST_NAME matches the provided FIRST_NAME.
7.	Validate that the LAST_NAME matches the provided LAST_NAME.
8.	Validate that the INSTRUCTOR_ID matches the provided INSTRUCTOR_ID.
*/

test('Task 3: Retrieve the newly created student and validate the response', async ({ request, newStudent }) => {
  const response = await request.get(`${process.env.API_ENDPOINT!}/${studentID}`)

  expect(response.status()).toBe(200)

  const responseBody = await response.json()

   for (const key in newStudent) {
    if (key === "DOB") {
      const receivedString = new Date(responseBody[key]).toISOString().split("T")[0]
      expect(receivedString).toBe(newStudent[key])
    } 
    else {
      expect(responseBody[key]).toBe(newStudent[key])
    }
  }
})


/*TASK-4: Update Newly Created Student with a Different Instructor
Title: Update the newly created student with a different instructor and validate the response

Steps:
1.	Send a PUT request to the endpoint to update the student's INSTRUCTOR_ID.
2.	Validate that the status code is 200.
3.	Validate that the response message is 'Successfully updated the student with the STUDENT_ID:  { STUDENT_ID }'.
*/

test('Task 4: Update the newly created student with a different instructor and validate the response', async ({ request, updatedStudent }) => {
  const response = await request.put(`${process.env.API_ENDPOINT!}/${studentID}`, {
    data: updatedStudent
  })

  expect(response.status()).toBe(200)

  const responseBody = await response.json()

  const expectedMessage = `Successfully updated the student with the STUDENT_ID: ${studentID}`
  expect(responseBody.message).toBe(expectedMessage)
})

/*TASK-5: Delete Newly Created Student
Title: Delete the newly created student and validate the response

Steps:
1.	Send a DELETE request to the endpoint to delete the student using STUDENT_ID.
2.	Validate that the status code is 204.
*/

test('Task 5: Delete the newly created student and validate the response', async ({ request }) => {
  const response = await request.delete(`${process.env.API_ENDPOINT!}/${studentID}`)

  expect(response.status()).toBe(204)
})

})