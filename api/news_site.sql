create schema news_site collate utf8mb3_general_ci;

USE news_site;

create table news
(
    id          int auto_increment
        primary key,
    title       varchar(255)           not null,
    description TEXT                   not null,
    image       varchar(255)           null,
    date_added  datetime default NOW() not null
);

create table comments
(
    id      int auto_increment,
    news_id int          not null,
    author  varchar(255) null,
    text    TEXT         not null
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int          not null,
    author  varchar(255) null,
    text    TEXT         not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
);

INSERT INTO news (title, description, image) VALUES ('Пожар', 'Сегодня в Бишкеке произошёл пожар', NULL), ('Погода на Иссык-Куле', 'Сегодня погода на Иссык-Куле будет пасмурннной временами дождь', NULL);

INSERT INTO comments (news_id, author, text) VALUES (1, NULL, 'В каком районе был пожар?'), (1, 'Anton', 'Потушили пожар?');

INSERT INTO comments (news_id, author, text) VALUES (2, 'Nurzat', 'Жаль'), ('2', NULL, 'Можно не сгореть');