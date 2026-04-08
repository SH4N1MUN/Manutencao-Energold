# Controle de Manutenção - pronto para GitHub Pages

Este pacote já está pronto para você subir no GitHub e publicar no GitHub Pages.

## O que ele já faz
- cadastro de OS
- funcionamento local mesmo sem Firebase
- fila local para sincronização posterior
- PWA com service worker
- exportação CSV
- sincronização com Firestore quando o `firebase-config.js` estiver preenchido

## Como publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione a branch principal (`main`) e pasta `/root`.
5. Salve.
6. Aguarde a URL do site ser gerada.

## Como conectar no Firebase
1. Crie um projeto no Firebase.
2. Ative o **Cloud Firestore**.
3. No app web do Firebase, copie as credenciais.
4. Abra o arquivo `firebase-config.js`.
5. Substitua os valores de exemplo pelos valores reais.
6. Faça novo commit e push.

## Coleção usada no Firestore
O app grava na coleção:
- `ordens_servico`

## Exemplo de regras temporárias de teste do Firestore
Use apenas para teste inicial:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ordens_servico/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Depois disso, endureça as regras.

## Como integrar com Power Automate e SharePoint
Recomendação prática:
1. Deixe o site publicando no GitHub Pages.
2. Salve os dados no Firestore.
3. Use Power Automate ou outro conector intermediário para jogar os dados no SharePoint.

## Observações
- Sem preencher o `firebase-config.js`, o app continua funcionando localmente.
- Para instalar como app no celular, abra pelo navegador e use **Adicionar à tela inicial**.
- Para usar e-mail automático ou SharePoint, a integração deve ser feita em uma segunda etapa.
