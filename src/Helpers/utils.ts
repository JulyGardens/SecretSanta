class Utils {
  public randomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  public randomString() {
    return (Math.random() + 1).toString(36).substring(3);
  }
}

export default new Utils();
