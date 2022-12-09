int f() {
    return 1;
}

int main(void) {
    struct {int x; int y;} a = {0,0};

    int b = &f();
}


