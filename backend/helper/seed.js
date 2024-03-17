// const faker = require('faker');
// const orgModel = require('../model/orgModel'); 
// const userModel = require('../model/userModel'); 

// async function seedOrganizations() {
// try {
//     await orgModel.deleteMany();
//     const organizations = [];
//     for (let i = 0; i < 5; i++) { 
//     const org = new orgModel({
//         orgName: faker.company.companyName(),
//         orgAddress: faker.address.streetAddress(),
//         orgCity: faker.address.city(),
//         postalCode: faker.address.zipCode(),
//         orgCountry: faker.address.country()
//     });
//     const savedOrg = await org.save();
//     organizations.push(savedOrg._id);
//     }
//     console.log('Organizations seeded successfully');
//     return organizations;
// } catch (error) {
//     console.error('Error seeding organizations:', error);
// }
// }

// async function seedUsers(organizationIds) {
// try {
//     await userModel.deleteMany();
//     const users = [];
//     for (let i = 0; i < 10; i++) {
//       const orgId = organizationIds[Math.floor(Math.random() * organizationIds.length)]; // Select random org ID
//     const user = new userModel({
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         orgId: orgId 
//     });
//     users.push(user);
//     }
//     await userModel.insertMany(users);

//     console.log('Users seeded successfully');
// } catch (error) {
//     console.error('Error seeding users:', error);
// } finally {
//     mongoose.disconnect();
// }
// }

// // seedOrganizations()
// // .then(organizationIds => seedUsers(organizationIds))
// // .catch(error => console.error('Error seeding data:', error));
// module.exports = { seedOrganizations};
