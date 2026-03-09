#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// fiz em c também por que gosto bastante.

char* inverterPalavra(const char* str) {
    if (str == NULL) {
        return NULL;
    }

    size_t len = strlen(str);
    char* invertida = (char*)malloc(len + 1);

    if (invertida == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < len; i++) {
        invertida[i] = str[len - 1 - i];
    }

    invertida[len] = '\0';
    return invertida;
}



int main() {
    const char* palavra = "Jitterbit";
    char* palavraInvertida = inverterPalavra(palavra);

    if (palavraInvertida != NULL) {
        printf("Palavra original: %s\n", palavra);
        printf("Palavra invertida: %s\n", palavraInvertida);
        free(palavraInvertida);
    } else {
        printf("Erro ao inverter a palavra.\n");
    }

    return 0;
}