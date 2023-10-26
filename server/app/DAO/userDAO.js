const express = require('express');
const pool = require('../db');
import config from '../config';

const userRole = {
    admin: 'admin',
    principal: 'principal',
    teacher: 'teacher',
    parent: 'parent',
    student: 'student'
};

const userRoles = [
  userRole.admin,
  userRole.principal,
  userRole.teacher,
  userRole.parent,
  userRole.student,
];
class UserDAO {
  async createUser(userData) {
    // Logika tworzenia użytkownika do bazy danych
  }

  async getUserById(userId) {
    // Logika odczytywania użytkownika z bazy danych
  }

  async updateUser(userId, userData) {
    // Logika aktualizowania danych użytkownika w bazie danych
  }

  async deleteUser(userId) {
    // Logika usuwania użytkownika z bazy danych
  }
}