import React, a from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Modal,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  useTheme,
  useMediaQuery,
  Tooltip,
  Button,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Dữ liệu mẫu được trích xuất và bổ sung theo file Client.csv của bạn
const mockClients = [
  { manualCode: 1, phong: '201', ten: 'Nguyễn Thị Huyền Trang', tinhtrang: 'Sắp chuyển đi', sdt: '0985462248', namsinh: 1998, nghenghiep: 'Kỹ thuật may', noithuongtru: 'Thôn Nhân Bình, Vũ Vân, Vũ Thư, Thái Bình', linkcccd: '034198004502', bienso: 'Trang: 17B2 - 57467', notes: '' },
  { manualCode: 2, phong: '201', ten: 'Trần Quốc Tuấn', tinhtrang: 'Sắp chuyển đi', sdt: '0913467865', namsinh: 1998, nghenghiep: '', noithuongtru: 'Đức Thuận, Thị Xã Hồng Lĩnh, Hà Tĩnh', linkcccd: '042098001070', bienso: 'Tuấn: 38F1 - 12445', notes: '' },
  { manualCode: 3, phong: '202', ten: 'Mai Huy Hoàng', tinhtrang: 'Đang ở', sdt: '', namsinh: 2006, nghenghiep: 'Sinh viên', noithuongtru: 'Thôn Kép 12, Hương Sơn, Lạng Giang, Bắc Giang', linkcccd: '024206013568', bienso: '', notes: '' },
  { manualCode: 4, phong: '202', ten: 'Đỗ Trọng Hoàn', tinhtrang: 'Đang ở', sdt: '', namsinh: 2005, nghenghiep: 'Sinh viên', noithuongtru: 'Thôn Kép 12, Hương Sơn, Lạng Giang, Bắc Giang', linkcccd: '024205012538', bienso: 'Hoàn: 98B3 - 52064', notes: '' },
  { manualCode: 21, phong: '701', ten: 'Lê Văn An', tinhtrang: 'Sắp chuyển đến', sdt: '0912345678', namsinh: 2000, nghenghiep: 'Nhân viên văn phòng', noithuongtru: 'Cầu Giấy, Hà Nội', linkcccd: '123456789012', bienso: '29A - 123.45', notes: 'Dọn vào ngày 15/09' },
  { manualCode: 20, phong: '601', ten: 'Vũ Thị Phương Nhi', tinhtrang: 'Đã ngừng ở', sdt: '0945770962', namsinh: 2002, nghenghiep: 'Sinh viên', noithuongtru: 'Yên Phong, Ý Yên, Nam Định', linkcccd: '036302007657', bienso: '', notes: '' }
];

const clientStatuses = ['Đang ở', 'Sắp chuyển đi', 'Sắp chuyển đến', 'Đã ngừng ở'];

// Component hiển thị chi tiết thông tin khách thuê
const ClientDetailCard = ({ client }) => (
  <Card variant="outlined">
    <CardHeader title={`Thông tin chi tiết: ${client.ten}`} subheader={`Mã khách: ${client.manualCode} - Phòng: ${client.phong}`} />
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><Typography variant="body2"><strong>SĐT:</strong> {client.sdt || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Năm sinh:</strong> {client.namsinh || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Nghề nghiệp:</strong> {client.nghenghiep || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Số CCCD:</strong> {client.linkcccd || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12}><Typography variant="body2"><strong>Nơi thường trú:</strong> {client.noithuongtru || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12}><Typography variant="body2"><strong>Biển số xe:</strong> {client.bienso || 'Chưa có'}</Typography></Grid>
        <Grid item xs={12}><Typography variant="body2"><strong>Ghi chú:</strong> {client.notes || 'Không có'}</Typography></Grid>
      </Grid>
    </CardContent>
  </Card>
);

// Component Form để thêm/sửa khách
const ClientForm = ({ clientData, handleInputChange, isEdit = false }) => (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Mã khách" name="manualCode" value={clientData.manualCode} onChange={handleInputChange} variant="outlined" size="small" disabled={isEdit} /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Phòng" name="phong" value={clientData.phong} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Tên khách" name="ten" value={clientData.ten} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12} sm={6}><TextField select fullWidth label="Tình trạng" name="tinhtrang" value={clientData.tinhtrang} onChange={handleInputChange} variant="outlined" size="small">{clientStatuses.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}</TextField></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Số điện thoại" name="sdt" value={clientData.sdt} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Năm sinh" name="namsinh" type="number" value={clientData.namsinh} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Nghề nghiệp" name="nghenghiep" value={clientData.nghenghiep} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Nơi thường trú" name="noithuongtru" value={clientData.noithuongtru} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Số CCCD" name="linkcccd" value={clientData.linkcccd} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Biển số xe" name="bienso" value={clientData.bienso} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
        <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Ghi chú" name="notes" value={clientData.notes} onChange={handleInputChange} variant="outlined" size="small" /></Grid>
    </Grid>
);


export default function App() {
  const [clients, setClients] = a.useState(mockClients);
  const [selectedClient, setSelectedClient] = a.useState(null);
  const [viewModalOpen, setViewModalOpen] = a.useState(false);
  const [addModalOpen, setAddModalOpen] = a.useState(false);
  const [editModalOpen, setEditModalOpen] = a.useState(false);
  const [formData, setFormData] = a.useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenViewModal = (client) => { setSelectedClient(client); setViewModalOpen(true); };
  const handleCloseViewModal = () => setViewModalOpen(false);

  const handleOpenAddModal = () => {
    setFormData({ manualCode: '', phong: '', ten: '', tinhtrang: 'Sắp chuyển đến', sdt: '', namsinh: '', nghenghiep: '', noithuongtru: '', linkcccd: '', bienso: '', notes: '' });
    setAddModalOpen(true);
  };
  const handleCloseAddModal = () => setAddModalOpen(false);
  
  const handleOpenEditModal = (client) => {
    setSelectedClient(client);
    setFormData(client);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClient = () => {
    // Logic để thêm khách hàng mới vào state `clients`
    console.log("Adding new client:", formData);
    // setClients(prev => [...prev, { ...formData, id: Date.now() }]); // Thêm vào danh sách
    handleCloseAddModal();
  };
  
  const handleEditClient = () => {
      // Logic để cập nhật khách hàng
      console.log("Updating client:", formData);
      handleCloseEditModal();
  }

  // Cập nhật màu badge theo yêu cầu
  const getStatusChip = (status) => {
    if (status === 'Đang ở') return <Chip label={status} color="success" size="small" />;
    if (status === 'Sắp chuyển đi') return <Chip label={status} color="primary" size="small" />;
    if (status === 'Sắp chuyển đến') return <Chip label={status} color="warning" size="small" />;
    if (status === 'Đã ngừng ở') return <Chip label={status} color="default" size="small" />;
    return <Chip label={status} size="small" />;
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '95%' : 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: isMobile ? 2 : 3,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static"><Toolbar><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Trung Tâm Điều Hành Nhà Trọ</Typography></Toolbar></AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom component="div">Quản Lý Khách Thuê</Typography>
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleOpenAddModal}>Thêm Khách</Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table aria-label="danh sách khách thuê">
            <TableHead sx={{ backgroundColor: '#eeeeee' }}>
              <TableRow>
                <TableCell>Mã khách</TableCell>
                <TableCell>Tên Khách Thuê</TableCell>
                {!isMobile && <TableCell>Phòng</TableCell>}
                <TableCell>Tình trạng</TableCell>
                {!isMobile && <TableCell>Số Điện Thoại</TableCell>}
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.manualCode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell><Typography variant="body2" fontWeight="bold">{client.manualCode}</Typography></TableCell>
                  <TableCell>{client.ten}</TableCell>
                  {!isMobile && <TableCell>{client.phong}</TableCell>}
                  <TableCell>{getStatusChip(client.tinhtrang)}</TableCell>
                  {!isMobile && <TableCell>{client.sdt || 'N/A'}</TableCell>}
                  <TableCell align="center">
                    <Tooltip title="Xem chi tiết"><IconButton size="small" color="info" onClick={() => handleOpenViewModal(client)}><VisibilityIcon /></IconButton></Tooltip>
                    <Tooltip title="Sửa"><IconButton size="small" color="secondary" onClick={() => handleOpenEditModal(client)}><EditIcon /></IconButton></Tooltip>
                    <Tooltip title="Xóa"><IconButton size="small" sx={{ color: 'error.main' }}><DeleteIcon /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal Xem chi tiết */}
      <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleCloseViewModal} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
          {selectedClient && <ClientDetailCard client={selectedClient} />}
        </Box>
      </Modal>

      {/* Modal Thêm/Sửa Khách */}
      <Modal open={addModalOpen || editModalOpen} onClose={addModalOpen ? handleCloseAddModal : handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>{editModalOpen ? 'Chỉnh Sửa Thông Tin Khách' : 'Thêm Khách Thuê Mới'}</Typography>
          <IconButton onClick={addModalOpen ? handleCloseAddModal : handleCloseEditModal} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
          <ClientForm clientData={formData} handleInputChange={handleInputChange} isEdit={editModalOpen} />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
             <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
                Import từ Excel
                <input type="file" hidden accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
             </Button>
             <Box>
                <Button onClick={addModalOpen ? handleCloseAddModal : handleCloseEditModal} sx={{ mr: 1 }}>Hủy</Button>
                <Button variant="contained" onClick={addModalOpen ? handleAddClient : handleEditClient}>{editModalOpen ? 'Lưu thay đổi' : 'Thêm Khách'}</Button>
             </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
