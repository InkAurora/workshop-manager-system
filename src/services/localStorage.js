import sha256 from 'crypto-js/sha256';

function createUsersDataBase() {
  const users = [] ;
  localStorage.setItem('users', JSON.stringify(users));
}

export function checkUsersDatabase() {
  const temp = JSON.parse(localStorage.getItem('users'));
  if (!temp) createUsersDataBase(); 
}

export function createUser(user, password) {
  const usersDataBase = JSON.parse(localStorage.getItem('users'));
  const duplicateUser = usersDataBase.find((element) => element.user === user);
  if (duplicateUser) {
    return 0;
  }
  const pass = sha256(password).toString();
  const obj = {
    user,
    password: pass,
  }
  const temp = JSON.parse(localStorage.getItem('users'));
  temp.push(obj);
  localStorage.setItem('users', JSON.stringify(temp));
  return 1;
}

export function login(user, password) {
  const usersDataBase = JSON.parse(localStorage.getItem('users'));
  const temp = usersDataBase.find((element) => element.user === user);
  if (temp) {
    const pass = sha256(password).toString();
    if (pass === temp.password) {
      const token = [user, sha256(`${pass}tokenAuth`).toString()];
      localStorage.setItem('loginToken', JSON.stringify(token));
      return 1;
    } else return 0;
  } else return 2;
}

export function validateUser() {
  const token = JSON.parse(localStorage.getItem('loginToken'));
  if (token) {
    if (token !== 'noToken' && token !== null) {
      const temp = JSON.parse(localStorage.getItem('users'))
      const auth = temp.find((element) => element.user === token[0]);
      if (token[1] === sha256(`${auth.password}tokenAuth`).toString()) {
        return 1;
      }
    }
  }
  return 0;
}

export function logoff() {
  localStorage.setItem('loginToken', JSON.stringify('noToken'));
}

function createDatabase() {
  const database = { items: [], services: [], sales: [] };
  localStorage.setItem('database', JSON.stringify(database));
}

function getDatabase() {
  const database = JSON.parse(localStorage.getItem('database'));
  return database;
}

function saveNewDatabase(newDatabase) {
  localStorage.setItem('database', JSON.stringify(newDatabase)); 
}

export function checkDatabase() {
  const database = getDatabase();
  if (!database) createDatabase();
}

export function addItem(entry) {
  const database = getDatabase();
  let idCount = 1;
  for (let i = 1; i < 10000; i += 1) {
    const temp = database.items.find((item) => item.id === i);
    if (temp !== undefined) {
      idCount = i + 1;
    }
  }
  entry = { ...entry, id: idCount };
  database.items.push(entry);
  database.items.sort((a, b) => a.name > b.name ? 1 : -1);
  saveNewDatabase(database);
}

export function getItems() {
  const database = getDatabase();
  return database.items;
}

export function addService(entry) {
  const database = getDatabase();
  let idCount = 1;
  for (let i = 1; i < 10000; i += 1) {
    const temp = database.services.find((service) => service.id === i);
    if (temp !== undefined) {
      idCount = i + 1;
    }
  }
  entry = { ...entry, id: idCount };
  database.services.push(entry);
  database.services.sort((a, b) => a.name > b.name ? 1 : -1);
  saveNewDatabase(database);
}

export function getServices() {
  const database = getDatabase();
  return database.services;
}

export function closeSale(entry) {
  const database = getDatabase();
  let idCount = 1;
  for (let i = 1; i < 10000; i += 1) {
    const temp = database.sales.find((sale) => sale.id === i);
    if (temp !== undefined) {
      idCount = i + 1;
    }
  }
  entry = { ...entry, id: idCount };
  database.sales.push(entry);
  database.sales.sort((a, b) => new Date(b.date) - new Date(a.date));
  saveNewDatabase(database);
}

export function getSales() {
  const database = getDatabase();
  return database.sales;
}

