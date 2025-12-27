// src/constants/dummyAccounts.js
import { ROLES } from "./roles";

export const dummyAccounts = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@student.unsap.ac.id",
    role: ROLES.MAHASISWA,
    isActive: true,
    prodi: "IF",
    nim: "123456789012",
  },
  {
    id: 2,
    name: "Siti Aminah",
    email: "siti@student.unsap.ac.id",
    role: ROLES.MAHASISWA,
    isActive: false,
    prodi: "SI",
    nim: "220660121034",
  },
  {
    id: 3,
    name: "Admin IF",
    email: "adminif@unsap.ac.id",
    role: ROLES.ADMIN_IF,
    isActive: true,
    prodi: "IF",
    nim: "",
  },
  {
    id: 4,
    name: "Admin SI",
    email: "adminsi@unsap.ac.id",
    role: ROLES.ADMIN_SI,
    isActive: true,
    prodi: "SI",
    nim: "",
  },
];
