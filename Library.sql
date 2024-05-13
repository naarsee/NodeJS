PGDMP      	                |            Library    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24590    Library    DATABASE     }   CREATE DATABASE "Library" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE "Library";
                postgres    false            �            1259    24625    books    TABLE     �   CREATE TABLE public.books (
    author character varying(255),
    id integer NOT NULL,
    isbn character varying(255),
    release_date timestamp without time zone,
    title character varying(500),
    user_id integer
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    24624    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    216            �           0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    215            �            1259    24636    users    TABLE     �   CREATE TABLE public.users (
    email character varying(255),
    id integer NOT NULL,
    name character varying(255),
    password character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24635    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            U           2604    24628    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            V           2604    24639    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �          0    24625    books 
   TABLE DATA           O   COPY public.books (author, id, isbn, release_date, title, user_id) FROM stdin;
    public          postgres    false    216   x       �          0    24636    users 
   TABLE DATA           :   COPY public.users (email, id, name, password) FROM stdin;
    public          postgres    false    218          �           0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 26, true);
          public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 19, true);
          public          postgres    false    217            X           2606    24634    books books_isbn_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);
 >   ALTER TABLE ONLY public.books DROP CONSTRAINT books_isbn_key;
       public            postgres    false    216            Z           2606    24632    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    216            \           2606    24645    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    218            ^           2606    24643    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            _           2606    24646    books fktest    FK CONSTRAINT     k   ALTER TABLE ONLY public.books
    ADD CONSTRAINT fktest FOREIGN KEY (user_id) REFERENCES public.users(id);
 6   ALTER TABLE ONLY public.books DROP CONSTRAINT fktest;
       public          postgres    false    216    4702    218            �   y   x��M,,�L,K���42�,,O-*14�4202�50�54R00�#N����̼�̂TNs.���Ҍ����d��ļ��*N#�~���R�9-��J�3�R9�L9-MY�Y��ih����� �,�      �   |  x�U�Is�@ ��3��9x���6,QYDj.Mw�/�~�djJS9~����K��.��[Ff��T��cϬD����X��;*m�T7g�H��]�`�4�)�8[i~��\�L���*��������Y�T���[�-�5�P�6��_QbM��6�L�tI.	�_��S�eқ���d5�S4�4I3:�^��aK�ˡ���{W�k��&�/R+� *_�q��A��ф"��^�g;�}�wF��r��r��"�%���c��;\�� f�4O�G�!�x/e-)��>��4���@z�	�:z��7�p��aJ����U�Wy#��S�ڸ��Tv���0���%�B��%�g���-:���X"jDo����ñ,���m     