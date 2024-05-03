public class Factorial {
    public static int factorial(int n) {
        if (n == 0 || n == 1)
            return 1;
        else
            return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int num;
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        num = scanner.nextInt();
        scanner.close();

        int result = factorial(num);
        System.out.println("Factorial of " + num + " is: " + result);
    }
}