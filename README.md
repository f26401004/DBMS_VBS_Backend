# DBMS_VBS_Backend

針對郵局實作的後端功能，但只實作了部份功能
1. 保險中僅包含儲蓄險以及一般保險
2. 每張金融卡代表一個帳戶，不存在副卡因此用戶只能透過那一張金融卡存取
3. 一般保險中只會是月繳，也只存在月繳利率

# Simple Query Test
1. 加總所有交易紀錄類型為手續費的金額
```
SELECT SUM(value) FROM Transactions WHERE type = 12 OR type = 13;
```
2. 搜尋所有有持有卡片的 user 資料
```
SELECT DISTINCT U.* FROM Users AS U, Cards AS C WHERE C.owner=U.username;
```
3. 插入新使用者
```
INSERT INTO Users (username, password, authCode, SSN, permission, createdBy, updatedBy, createdAt, updatedAt) VALUES ('test004', '$2y$12$vUWvHv6o5tV15kG0.BwF8u3a0JFu.cIBue1MP7ugiZ880xaSIcInO', 'Dps3Q6DGTLywnrs1ZN9E', 'E130003604', 0, 'root', 'root', NOW(), NOW());
```
4. 更新使用者 test004 的 SSN
```
UPDATE Users SET SSN='G130003604' WHERE username='test004';
```
5. 刪除使用者 test004
```
DELETE FROM Users WHERE username='test004';
```

# Complex Query Test
1. 搜尋所有交易紀錄的 user 名字以及交易編號
```
SELECT U.username, T.id FROM Users AS U, Cards AS C, Transactions AS T WHERE T.userCard = C.cardNo AND C.owner = U.username;
```
2. 搜尋所有沒有進行交易並且擁有卡片的 user 的 username、SSN 以及卡片持有數量
```
SELECT Temp.SSN, Temp.username, COUNT(cardNo)
 FROM (SELECT username, SSN  FROM Users WHERE SSN NOT IN (SELECT DISTINCT C.owner AS username FROM Cards AS C, Transactions AS T WHERE T.userCard = C.cardNo)) AS Temp, Cards AS C1 WHERE C1.owner = Temp.SSN GROUP BY Temp.SSN, Temp.username;
```
3. 搜尋所有沒有進行交易的 user 的 username、SSN
```
SELECT username, SSN  FROM Users WHERE SSN NOT IN (SELECT DISTINCT C.owner AS username FROM Cards AS C, Transactions AS T WHERE T.userCard = C.cardNo)
```
4. 搜尋交易金額大於等於 1000 的交易紀錄數量、總和、平均、最大值、最小值
```
SELECT COUNT(*), SUM(value), AVG(value), MAX(value), MIN(value) FROM Transactions WHERE value >= 1000;
```
5. 當存在交易金額為 5000 的交易紀錄時，搜尋所有使用者資料（EXIST）
```
SELECT * FROM Users WHERE EXISTS (SELECT * FROM Transactions WHERE value = 5000);
```
6. 統計 f26401004 使用者目前所有的交易總額（含手續費）
```
SELECT username, SUM(value) FROM Users AS U, Transactions AS T, Cards AS C WHERE T.userCard = C.cardNo AND C.owner = U.username GROUP BY username HAVING username = 'f26401004';
``` 