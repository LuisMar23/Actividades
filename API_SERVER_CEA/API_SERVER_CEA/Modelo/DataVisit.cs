namespace API_SERVER_CEA.Modelo
{
    public class DataVisit
    {
        public string actividad{ get; set; }
        public string nombrePersona { get; set; }
        public string apellidoPersona { get; set; }
        public string? barriozona { get; set; }
        public string nombreInstitucion { get; set; }
        public string? edad { get; set; }
        public string? ciPersona { get; set; }
        public string? celularPersona { get; set; }
        public string lugar { get; set; }
        public string? genero { get; set; }
        public  DateTime fecha { get; set; }
        //public string? email { get; set; }
        public string? observaciones { get; set; }
        public string tipo { get; set; }  
    }
}
