import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[] 
    addUserCallback: (name: UserType['name'])=>void 
}

type ErrorType = (error: string)=>void;
type NameType = (name: UserType['name'])=>void;

export const pureAddUser = (
    name: UserType['name'], 
    setError: ErrorType, 
    setName: NameType, 
    addUserCallback: GreetingContainerPropsType['addUserCallback']
    ) => {
        const trimmedName = name.trim();
    if(!trimmedName.length) {
        setError("Ошибка! Введите имя!")
    } else {
        addUserCallback(trimmedName);
        setName('')
        setError('')
    }
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: UserType['name'], setError: ErrorType) => {
            const trimmedName = name.trim();
    if(!trimmedName.length) {
        setError("Ошибка! Введите имя!")
    } 
    // если имя пустое - показать ошибку
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: ()=>void) => { // если нажата кнопка Enter - добавить
    if(e.key === 'Enter') addUser();
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<UserType['name']>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length; // need to fix
    const lastUserName = users[users.length - 1]?.name || '' // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
