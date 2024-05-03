#include <iostream>

int main() {
    int numbers[] = {5, 10, 15, 20, 25};
    int sum = 0;
    for (int i = 0; i < sizeof(numbers) / sizeof(numbers[0]); i++) {
        sum += numbers[i];
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}