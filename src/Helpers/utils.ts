class Utils {
  public randomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export default new Utils()