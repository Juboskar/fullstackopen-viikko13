CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);
INSERT INTO blogs (author, url, title) values ('Vincent Driessen', 'https://nvie.com/posts/a-successful-git-branching-model/', 'A successful Git branching model');
INSERT INTO blogs (author, url, title) values ('Martin Fowler', 'https://martinfowler.com/articles/is-quality-worth-cost.html', 'Is High Quality Software Worth the Cost?');