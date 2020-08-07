export class RandomColorUtils {
    public static getRandomColor = (): string => {
        return `#${Math.random().toString(16).substr(-6)}`
    }
}