Pentru rulare:
In /client se va rula comanda "npm run build" pentru a se crea un build actual al frontend-ului.
Apoi, se va rula "python3 run.py" pentru a porni backend-ul.

Am implementat aproape toate paginile, singurele pe care nu am reusit sa le implementez calumea sunt cea de profil si paginile pentru fiecare reteta in parte.
Am implemntat conform design-ului.
Pe backend am implementat aproape tot, mai putin rating-urile pentru retete si pozele pentru retete. Am login functional cu JWT, baza de date sql.

Pe parcursul celor 3 saptamani am invatat sa lucrez cu SQL si cu flask. Fiecare endpoint a fost usor de implementat folosind flask si SQLAlchemy.

Din pacate nu am apucat sa implementez nici un bonus, insa voiam sa implementez un search custom folosind un LLM(posibil oferit de OpenAI, dar as fi putut si sa folosesc OLLama, deoarece are suport de functii). In teorie, ar fi fost usor de implementat, folosind doar o functie de cautare de tip RAG, insa pentru a adauga functionalitatea asta trebuia sa fac o pagina in plus pentru site si sa fac un endpoint prin care modelul sa primeasca in backend retetele.