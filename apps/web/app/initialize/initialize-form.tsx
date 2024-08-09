"use client";

import { createAdmin } from "@/app/initialize/actions";
import { useActionState } from "react";


const initializeState = {
    message: ""
}

export function InitializeForm() {


    const [state, formAction] = useActionState(createAdmin, initializeState)


    return (
        <form action={formAction} className="w-80">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">超级管理员帐号</label>
            <div className="mt-2">
                <input placeholder="请输入..." className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="username" id="username" required></input>
            </div>
            <div className="h-4"></div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">密码</label>
            <div className="mt-2">
                <input placeholder="请输入..." name="password" id="password" type="password"  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></input>
            </div>

            <div className="h-4"></div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">再次输入密码</label>
            <div className="mt-2">
                <input placeholder="请输入..." name="repeatPassword" id="repeatpassword" type="password" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></input>
            </div>
            <p aria-live="polite" className="sr-only">
                {state?.message}
            </p>
            <div className="mt-4 text-right">
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">提交</button>
            </div>
        </form>
    )
}