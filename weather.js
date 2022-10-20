#!/usr/bin/env node
import { getArgs } from './helpers/args.helper.js'
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js'
import { getKey, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getIcon, getWeather } from "./services/api.service.js";

const isProvided = (input) => {
    if (!input.length) {
        throw new Error('Token or city wasn\'t provided')
    }
}

const saveToken = async (token) => {
    isProvided(token)

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess(`Token: ${token} is set`)
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    isProvided(city)

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess(`City: ${city} is set`)
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const city = await getKey(TOKEN_DICTIONARY.city) ?? process.env.CITY
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        switch (e?.response?.status) {
            case 404:
                printError('Invalid city name')
                break
            case 401:
                printError('Invalid token')
                break
            default:
                printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }

    return getForecast()
}

initCLI()
