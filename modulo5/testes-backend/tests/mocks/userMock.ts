import { User, USER_ROLES } from "../../src/model/User";

export const userMocks = new User(
    "id_mock1",
    "mock1",
    "mock1@gmail.com",
    "mocks123",
    USER_ROLES.ADMIN
)

export const userMocks2 = new User(
    "id_mock2",
    "mock2",
    "mock2@gmail.com",
    "mocks123",
    USER_ROLES.NORMAL
)