"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
import { adminAxiosInstance } from "@/utils/constants";
import { User } from "@/utils/types";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<string | null>(null);
  const [change, setChange] = useState(false);

  const filterUser = async () => {
    try {
      const { data } = await adminAxiosInstance.get(
        `/api/auth/filter-users/?filter=${filter}&page=${page}`
      );
      if (data.success) {
        console.log(data);

        setUsers(data.users);
        setCount(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id: string) => {
    try {
      const { data } = await adminAxiosInstance.put(
        `/api/auth/change-user-status/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        setChange(!change);
      }
    } catch (error) {
      toast.error("failed to block/unblock user");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      console.log(page);

      try {
        const { data } = await adminAxiosInstance.get(
          `/api/auth/get-all-users/?page=${page}`
        );
        if (data.success) {
          console.log(data.users);

          setUsers(data.users);
          setCount(data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (filter) {
      filterUser();
    } else {
      getUsers();
    }
  }, [page, filter, change]);

  console.log(count);
  return (
    <AdminLayout>
      <Toaster />
      <TableContainer component={Paper}>
        <div className="p-3 flex justify-between">
          <h1 className="text-2xl font-semibold ">All Users</h1>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#F9FBFF]  outline-none  border-2 border-[#a7bbe3] rounded-sm px-3 py-2"
          >
            <option value="" defaultValue="">
              Sort
            </option>
            <option value="auctioner">Auctioner</option>
            <option value="bidder">Bidder</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> #</TableCell>
              <TableCell> Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length === 0 && (
              <h1 className="text-center font-semibold text-2xl my-5">
                No user found.....
              </h1>
            )}
            {users?.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.isActive ? (
                    <button
                      onClick={() => handleStatus(user._id)}
                      className="bg-green-500 border-2 border-green-800 py-2 px-3 rounded-sm"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(user._id)}
                      className="bg-red-500 border-2 border-red-900 text-white py-2 px-3 rounded-sm"
                    >
                      Blocked
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="my-2">
          {count / 5 > 1 && (
            <Pagination
              count={Math.ceil(count / 5)}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          )}
        </div>
      </TableContainer>
    </AdminLayout>
  );
}
