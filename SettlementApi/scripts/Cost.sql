CREATE TABLE [Cost](
	[ID] UNIQUEIDENTIFIER PRIMARY KEY,
	[SheetID] UNIQUEIDENTIFIER NOT NULL,
	[Type] UNIQUEIDENTIFIER NOT NULL,
	[Amount] INT NOT NULL,
	[Unit] DECIMAL(18,2) NOT NULL,
	[Total] DECIMAL NOT NULL,
	[Status] VARCHAR(30) NOT NULL,
	[Remark] NVARCHAR(1000) NULL,
	[CreateTime] DATETIME NOT NULL,
	[LastModifyTime] DATETIME NULL,
	[LastModifyUser] UNIQUEIDENTIFIER NULL,
	[Deleted] BIT NOT NULL DEFAULT(0)
)