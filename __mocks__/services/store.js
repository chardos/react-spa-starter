import faker from 'faker';

export const getUserId = () => {
    return faker.random.uuid();
}
