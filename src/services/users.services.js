const path = require("path");
const fs = require("fs/promises");

const jsonPath = path.resolve("./src/data.json");

const getLastId = (dataArray) => {
  const lastElementIndex = dataArray.length - 1;
  return dataArray[lastElementIndex].id + 1;
};

class UsersServices {
  static async getAll() {
    try {
      const jsonFile = await fs.readFile(jsonPath, "utf-8");
      return jsonFile;
    } catch (error) {
      throw error;
    }
  }
  static async create(newUser) {
    try {
      const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
      usersArray.push({ ...newUser, id: getLastId(usersArray) });
      await fs.writeFile(jsonPath, JSON.stringify(usersArray));
      return [];
    } catch (error) {
      throw error;
    }
  }
  static async update(updatedUser, id) {
    try {
      const { name, email, password } = updatedUser;
      const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
      const userIndex = usersArray.findIndex((user) => user.id === id);
      if (name) {
        usersArray[userIndex].name = name;
      }
      if (email) {
        usersArray[userIndex].email = email;
      }
      if (password) {
        usersArray[userIndex].password = password;
      }
      await fs.writeFile(jsonPath, JSON.stringify(usersArray));
      return [];
    } catch (error) {
      throw error;
    }
  }
  static async delete(id){
    try {
      const usersArray = JSON.parse(await fs.readFile(jsonPath, "utf-8"));
      const userIndex = usersArray.findIndex((user) => user.id === id);
      usersArray.splice(userIndex, 1);
      await fs.writeFile(jsonPath, JSON.stringify(usersArray));
      return [];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersServices;
