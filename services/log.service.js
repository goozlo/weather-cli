import chalk from 'chalk'
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bold(chalk.bgRed(' Error ')) + ' ' + error)
}

export const printSuccess = (message) => {
    console.log(chalk.bold(chalk.bgGreen(' Success ')) + ' ' + message)
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bold(chalk.bgCyan(' Help '))}
        No arguments - weather forecast output
        -s [CITY] for setting a city
        -h for helping
        -t [API_KEY] for saving token`
    )
}

export const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER FORECAST ')} 
        ${chalk.bold('City')}: ${res.name}
        ${chalk.bold('Weather')}: ${icon} ${res.weather[0].description}
        ${chalk.bold('Temperature')}: ${res.main.temp} (feels like ${res.main.feels_like})
        ${chalk.bold('Humidity')}: ${res.main.humidity}%
        ${chalk.bold('Wind speed')}: ${res.wind.speed}`
    )
}
