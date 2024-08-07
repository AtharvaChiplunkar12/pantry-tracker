template = """
Fill only those fields that can be extracted from the query. No assumptions. Leave any field blank if not found in the query.
The output should strictly only have one answer. The output should be in JSON format.
The answer format:
JSON OBJECT WITH ALL ATTRIBUTES. No sentences or extra words please. 

Genre Table:
12 - Adventure
14 - Fantasy
16 - Animation
18 - Drama
27 - Horror
28 - Action
35 - Comedy
36 - History
37 - Western
53 - Thriller
80 - Crime
99 - Documentary
878 - Science Fiction
9648 - Mystery
10402 - Music
10749 - Romance
10751 - Family
10752 - War
10770 - TV Movie

Query: {query}

Your aim is to generate a JSON object with the query given below. There is a genre table which has genres and their IDs.

Here are some attribute examples to formulate your answer:
- region: Example: 'US', 'IN'
- year: Example: 2023, 2024
- release_date.gte: Example: '2015-01-01'
- release_date.lte: Example: '2015-12-31'
- vote_average.gte: Example: 6
- vote_average.lte: Example: 10
- with_genres: Example: (use IDs from the genre table)
- with_origin_country: Example: 'US', 'IN'
- without_genres: Example: (use IDs from the genre table)
- with_original_language: Example: 'hi', 'en'

The JSON object should have all the following attributes: (your answer should have only these attributes in JSON format. strictly no other word or sentence
like Your Answer or Answer)
  "year": "", # Year of the movie (if specified in the query)
  "region": "", # Region of the movie (if specified in the query)
  "release_date.gte": "", # Release date greater than or equal to (if specified in the query)
  "release_date.lte": "", # Release date less than or equal to (if specified in the query)
  "vote_average.gte": "", # Minimum vote average (if specified in the query)
  "vote_average.lte": "", # Maximum vote average (if specified in the query)
  "with_genres": "", # Genres of the movie (use IDs from the genre table)
  "with_origin_country": "", # Origin country of the movie (if specified in the query)
  "without_genres": "", # Genres to exclude (use IDs from the genre table)
  "with_original_language": "" # Original language of the movie (if specified in the query)
"""

few_shots = [
    {
        "query": "Suggest some horror comedy Bollywood movies",
        "answer": '"region": "IN","with_genres": "27,35","with_origin_country": "IN","with_original_language": "hi"'
    },
    {
        "query": "Suggest some horror Bollywood movies",
        "answer": '"region": "IN","with_genres": "27","with_origin_country": "IN","with_original_language": "hi"'
    },
    {
        "query": "Suggest some horror Bollywood movies",
        "answer": '"with_genres": "27"'
    },
    {
        "query": "Suggest latest action movies",
        "answer": '"year": "2024","with_genres": "28"'
    },
    {
        "query": "2013 Thriller movies",
        "answer": '"year": "2013","with_genres": "53"'
    },
    {
        "query": "Suggest French movies",
        "answer": '"with_original_language": "fr"'
    },
    {
        "query": "Suggest a Hollywood movie before 2015",
        "answer": '"region": "US","release_date.lte": "2015","with_original_language": "en"'
    },
    {
        "query": "Suggest a good comedy movie after 2019",
        "answer": '"release_date.gte": "2019","vote_average.gte": "7","with_genres": "35"'
    },
    {
        "query": "Suggest a good non science fiction, mystery movie",
        "answer": '"with_genres": "9648","without_genres": "878"'
    },
    {
        "query": "Suggest a indian movies",
        "answer": '"region": "IN"'
    }
]