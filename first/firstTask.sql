SELECT g.name_genre AS name_genre, b.title AS title, a.author_name AS name_author
FROM book AS b
JOIN genre AS g ON b.genre_id = g.genre_id
JOIN author AS a ON b.author_id = a.author_id
WHERE g.name_genre LIKE '%роман%'
ORDER BY b.title;