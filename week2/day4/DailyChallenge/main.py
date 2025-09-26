import requests
import random
import psycopg2


# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="my_dataBase",
    user="postgres",
    password="*******",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Fetch all countries from API
url = "https://restcountries.com/v3.1/all"
response = requests.get(url)
countries = response.json()

# 10 random countries
sample_countries = random.sample(countries, 10)

# Insert them into DB
for c in sample_countries:
    name = c.get("name", {}).get("common", "Unknown")
    capital = c.get("capital", ["Unknown"])[0] if c.get("capital") else None
    flag = c.get("flags", {}).get("png")
    subregion = c.get("subregion")
    population = c.get("population")

    cur.execute(
        """
        INSERT INTO countries (name, capital, flag, subregion, population)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (name, capital, flag, subregion, population)
    )

# 5. Commit + close
conn.commit()
cur.close()
conn.close()

print("10 random countries inserted into DB.")
