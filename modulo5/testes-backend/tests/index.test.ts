import { UserBusinessMock } from "./mocks/UserBusinessMock"
import { UserDatabaseMock } from "./mocks/UserDatabaseMock"

const userBusinessMock = new UserBusinessMock(
    new UserDatabaseMock()
)

describe("getUserById", () => {
    test("Should catch error when id is not registered", async () => {
        expect.assertions(2)

        try {
            await userBusinessMock.getUserById("wrongId")
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("User not found")
        }
    })

    test("Should return respective user when id is registered", async () => {
        expect.assertions(1)

        try {
            const result = await userBusinessMock.getUserById('id_mock1')

            expect(result).toEqual({
                id: "id_mock1",
                name: "mock1",
                email: "mock1@gmail.com",
                password: "mocks123",
                role: "ADMIN"
            })
        } catch (error) {
            console.log(error.message);            
        }
    })
})